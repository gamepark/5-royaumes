import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Kingdom } from '../cards/Kingdom'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ThroneRule } from './card-effect/ThroneRule'
import { RuleId } from './RuleId'
import { InfluenceUtils } from './utils/InfluenceUtils'

export class InfluenceRule extends PlayerTurnRule {
  onRuleStart() {
    if (this.isImperialOrder) return []
    return this.placeCardMove
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return new InfluenceUtils(this.game, this.hand).influenceMoves
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = new ThroneRule(this.game, this.player).onInfluence(move)
    if (this.isImperialOrder) return moves
    moves.push(...this.placeCardMove)
    return moves
  }

  get placeCardMove() {
    const hand = this.hand
    if (!hand.length) return [this.rules().startRule(RuleId.ActivateCharacter)]
    const moves = new InfluenceUtils(this.game, hand).influenceMoves
    if (!moves.length) return []
    return moves.slice(0, 1)
  }

  get isImperialOrder() {
    return this.hand.filter((item) => item.id.back === Kingdom.ImperialOrder).length
  }

  get hand() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(this.player)
  }
}