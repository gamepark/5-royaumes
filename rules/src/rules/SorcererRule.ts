import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { isTitan } from '../cards/CardType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ThroneRule } from './card-effect/ThroneRule'
import { RuleId } from './RuleId'

export class SorcererRule extends PlayerTurnRule {

  getPlayerMoves() {
    const moves: MaterialMove[] = []

    const discard = this.discard
    const titans = discard.filter((item) => isTitan(item.id.front))
    const characters = discard.filter((item) => !isTitan(item.id.front))
    // RECRUIT
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

    // INFLUENCE
    moves.push(
      ...this.discard
        .moveItems((item) => ({
          type: LocationType.PlayerInfluenceZone,
          player: this.player,
          id: item.id.back
        }))
    )

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return []
    const moves: MaterialMove[] = []
    const effectRule = new ThroneRule(this.game, this.player)
    if (move.location.type === LocationType.PlayerInfluenceZone) {
      moves.push(...effectRule.onInfluence(move))
    }

    if (move.location.type === LocationType.PlayerThroneRoom || move.location.type === LocationType.PlayerTitan) {
      moves.push(...effectRule.onRecruit(move))
    }

    if (move.location.type === LocationType.PlayerTitan) {
      const titans = this.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(this.player).length
      if (titans === 5) {
        moves.push(this.rules().endGame())
        return moves
      }
    }

    moves.push(this.rules().startRule(RuleId.Influence))
    return moves
  }

  get discard() {
    return this.material(MaterialType.CharacterCard).location(LocationType.Discard)
  }
}