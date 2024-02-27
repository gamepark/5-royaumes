import { isMoveItemType, ItemMove, Material, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { isTitan } from '../cards/CardType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ThroneRule } from './card-effect/ThroneRule'
import { RuleId } from './RuleId'

export class RecruitRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = this
      .hand
      .rotateItems(true)

    return moves
  }

  getPlayerMoves() {
    const cards = this.cardsToRecruit
    const titans = cards.filter((item) => isTitan(item.id.front))
    const characters = cards.filter((item) => !isTitan(item.id.front))
    const moves: MaterialMove[] = []

    // Character
    moves.push(
      ...Array.from(Array(4))
        .flatMap((_, x) =>
          characters.moveItems({
            type: LocationType.PlayerThroneRoom,
            player: this.player,
            x
          })
        )
    )

    // Titans
    moves.push(
      ...titans.moveItems({
        type: LocationType.PlayerTitan,
        player: this.player
      })
    )

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return []

    const moves: MaterialMove[] = []
    if (move.location.type === LocationType.PlayerThroneRoom || move.location.type === LocationType.PlayerTitan) {
      moves.push(...new ThroneRule(this.game, this.player).onRecruit(move))
    }

    if ((move.location.type === LocationType.PlayerHand && move.location.rotation && !this.hiddenCards.length && !this.cardsToRecruit.length)
      || move.location.type === LocationType.PlayerThroneRoom || move.location.type === LocationType.PlayerTitan) {
      moves.push(...this.discardHand)
      if (move.location.type === LocationType.PlayerTitan) {
        const titans = this.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(this.player).length
        if (titans === 5) {
          moves.push(this.rules().endGame())
          return moves
        }
      }

    }

    return moves
  }

  get cardsToRecruit() {
    const titans = this.titans
    const characters = this.throneRoom

    return this.hand
      .filter((item) =>
        !this.hasCharacter(titans, item) && !this.hasCharacter(characters, item)
      )
  }

  hasCharacter(characters: Material, item: MaterialItem): boolean {
    return !!characters.id((id: any) => id.front === item.id.front).length
  }

  get titans() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(this.player)
  }

  get throneRoom() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerThroneRoom).player(this.player)
  }

  get hiddenCards() {
    return this.hand.rotation((r) => r === undefined)
  }

  get discardHand() {
    return [
      ...this.hand.moveItems({ type: LocationType.Discard }),
      this.rules().startRule(RuleId.RefillAlkane)
    ]
  }

  get hand() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(this.player)
  }
}