import { isStartRule, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ThroneRule } from './card-effect/ThroneRule'
import { RuleId } from './RuleId'

export class InfluenceRule extends PlayerTurnRule {
  onRuleStart() {
    return this.placeCardMove
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = new ThroneRule(this.game, this.player).onInfluence(move)
    if (moves.find(isStartRule)) return moves
    moves.push(...this.placeCardMove)
    return moves
  }

  get placeCardMove() {
    const hand = this.hand
    if (!hand.length) return [this.rules().startRule(RuleId.RefillAlkane)]
    const realms = hand.getItem()!.id.back
    return hand
      .limit(1)
      .moveItems({
        type: LocationType.PlayerInfluenceZone,
        id: realms,
        player: this.player
      })
  }

  get hand() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(this.player)
  }
}