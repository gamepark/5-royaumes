import { getDistanceBetweenSquares, isMoveItemType, ItemMove, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChooseAlkaneColorRule extends PlayerTurnRule {

  onRuleStart() {
    const adjacentCards = this.adjacentCards
    if (!adjacentCards) return []
    if (adjacentCards.length > 1 && adjacentCards.filter((item) => adjacentCards.getItem()!.id.back === item.id.back).length !== adjacentCards.length) return []
    return [
      adjacentCards.moveItem({
        type: LocationType.PlayerHand,
        player: this.player
      })
    ]
  }

  getPlayerMoves() {
    const adjacentCards = this.adjacentCards
    if (!adjacentCards) return []

    return adjacentCards.moveItems({
      type: LocationType.PlayerHand,
      player: this.player
    })
  }

  get adjacentCards() {
    const bannerCard = this.placedCard
    const alkaneCard = this.alkaneCard
    if (!bannerCard) return
    return alkaneCard
      .filter((item) => this.isAdjacent(item, bannerCard!))
  }

  get placedCardIndex() {
    return this.remind<number>(Memory.PlacedCard)
  }

  get placedCard() {
    const index = this.placedCardIndex
    if (index === undefined) return undefined
    return this.material(MaterialType.CharacterCard).getItem(index)!
  }

  get alkaneCard() {
    return this.material(MaterialType.CharacterCard).location(LocationType.AlkaneSquare)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move) || this.placedCard === undefined) return []

    const card = this.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    const cardWithSameBack = this.alkaneCard
      .filter((item) => item.id.back === card.id.back)

    const moves: MaterialMove[] = []

    if (cardWithSameBack.length) {
      moves.push(
        cardWithSameBack
          .moveItem({
            type: LocationType.PlayerHand,
            player: this.player
          })
        )
    } else {
      moves.push(this.rules().startRule(RuleId.ChooseAction))
    }

    return moves
  }

  private isAdjacent(card: MaterialItem, item: MaterialItem) {
    return getDistanceBetweenSquares(
      { x: card.location.x!, y: card.location.y! },
      { x: item.location.x!, y: item.location.y! }
    ) === 1
  }
}