import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class RefillAlkaneRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    const alkaneCards = this.alkaneCards
    const deck = this.bannerDeck.deck()
    const isEnd = !deck.length
    || (alkaneCards.length === 1 && deck.length < 6)
    || !alkaneCards.length && deck.length < 7
    if (isEnd) return [this.rules().startRule(RuleId.EndGame)]
    if (alkaneCards.length > 1) return [this.endRuleMoves]
    if (alkaneCards.length === 1) {
      const remainingCard = alkaneCards.getItem()!
      if (remainingCard.location.x !== 1 || remainingCard.location.y !== 0) {
        moves.push(alkaneCards.moveItem({
          type: LocationType.AlkaneSquare,
          x: 1,
          y: 0
        }))
      }
    } else if (alkaneCards.length === 0 ) {
      moves.push(deck.dealOne({ type: LocationType.AlkaneSquare, x: 1, y: 0}))
    }

    if (alkaneCards.length <= 1) {
      moves.push(deck.dealOne({ type: LocationType.AlkaneSquare, x: 2, y: 0}))
      moves.push(deck.dealOne({ type: LocationType.AlkaneSquare, x: 2, y: 1}))
      moves.push(deck.dealOne({ type: LocationType.AlkaneSquare, x: 1, y: 2}))
      moves.push(deck.dealOne({ type: LocationType.AlkaneSquare, x: 0, y: 2}))
      moves.push(deck.dealOne({ type: LocationType.AlkaneSquare, x: 0, y: 1}))
    }


    moves.push(this.endRuleMoves)

    return moves;
  }

  get endRuleMoves() {
      return this.rules().startPlayerTurn(RuleId.DrawBannerCard, this.nextPlayer)
  }

  get bannerDeck() {
    return this.material(MaterialType.CharacterCard).location(LocationType.BannerDeck)
  }

  get alkaneCards() {
    return this
      .material(MaterialType.CharacterCard)
      .location(LocationType.AlkaneSquare)
  }
}