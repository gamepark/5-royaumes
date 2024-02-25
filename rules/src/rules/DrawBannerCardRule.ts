import { getDistanceBetweenSquares, isMoveItemType, ItemMove, MaterialItem, MaterialMove, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { AlkaneSquareRule } from './utils/AlkaneSquareRule'

export class DrawBannerCardRule extends PlayerTurnRule {
  getPlayerMoves() {
    const moves: MoveItem[] = []
    const alkaneSquareRule = new AlkaneSquareRule(this.game)
    const bannerCard = this.bannerCard
    for (const location of alkaneSquareRule.validAlkaneSquare) {
      moves.push(
        bannerCard.moveItem(location)
      )
    }

    return moves
  }

  get alkaneCards() {
    return this
      .material(MaterialType.CharacterCard)
      .location(LocationType.AlkaneSquare)
  }

  get bannerCard() {
    return this.material(MaterialType.CharacterCard)
      .location(LocationType.BannerDeck)
      .maxBy((item) => item.location.x!)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move) || move.location.type !== LocationType.AlkaneSquare) return []

    const moves: MaterialMove[] = []
    const cards = this.getAdjacentCardsOfSameRealm(move.itemIndex, [move.itemIndex])
    if (cards.length === 1) {
      this.memorize(Memory.PlacedCard, move.itemIndex)
      moves.push(this.rules().startRule(RuleId.ChooseAlkaneColor))
      return moves
    }

    moves.push(...this.material(MaterialType.CharacterCard).indexes(cards).moveItems({ type: LocationType.PlayerHand, player: this.player }))
    moves.push(this.rules().startRule(RuleId.ChooseAction))

    return moves
  }

  getAdjacentCardsOfSameRealm(cardIndex: number, cards: number[]) {
    const alkaneCards = this.alkaneCards
    const card = alkaneCards.getItem(cardIndex)!

    const adjacentIndexes = []
    for (const index of alkaneCards.getIndexes()) {
      if (cards.includes(index)) continue
      const item = alkaneCards.getItem(index)!
      const isAdjacentCard = this.isAdjacentAndSameColor(card, item)
      if (!isAdjacentCard) continue
      adjacentIndexes.push(index)
    }


    if (!adjacentIndexes.length) return cards
    const sameCards = [...cards]
    for (const index of adjacentIndexes) {
      sameCards.push(...this.getAdjacentCardsOfSameRealm(index, [...sameCards, index]))
    }

    return sameCards
  }

  private isAdjacentAndSameColor(card: MaterialItem, item: MaterialItem) {
    return card.id.back === item.id.back && getDistanceBetweenSquares(
      { x: card.location.x!, y: card.location.y! },
      { x: item.location.x!, y: item.location.y! }
    ) === 1
  }
}