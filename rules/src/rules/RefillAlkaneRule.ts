import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
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

    if (alkaneCards.length > 1) return [this.endRuleMove]

    if (alkaneCards.length === 0) {
      moves.push(deck.dealOne({ type: LocationType.AlkaneSquare, x: 1, y: 0 }))
    }

    const x = (alkaneCards.getItem()?.location.x ?? 1) - 1
    const y = (alkaneCards.getItem()?.location.y ?? 0)
    moves.push(deck.dealOne({ type: LocationType.AlkaneSquare, x: x + 2, y: y }))
    moves.push(deck.dealOne({ type: LocationType.AlkaneSquare, x: x + 2, y: y + 1 }))
    moves.push(deck.dealOne({ type: LocationType.AlkaneSquare, x: x + 1, y: y + 2 }))
    moves.push(deck.dealOne({ type: LocationType.AlkaneSquare, x: x, y: y + 2 }))
    moves.push(deck.dealOne({ type: LocationType.AlkaneSquare, x: x, y: y + 1 }))

    moves.push(this.endRuleMove)

    return moves
  }

  get endRuleMove() {
    const freeTurns = this.freeTurns
    if (freeTurns) {
      this.memorize<number>(Memory.FreeTurns, (turns) => turns - 1)
      if (this.freeTurns === 0) this.forget(Memory.FreeTurns)
      return this.rules().startRule(RuleId.DrawBannerCard)
    }

    return this.rules().startPlayerTurn(RuleId.DrawBannerCard, this.nextPlayer)
  }

  get freeTurns() {
    return this.remind(Memory.FreeTurns) ?? 0
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