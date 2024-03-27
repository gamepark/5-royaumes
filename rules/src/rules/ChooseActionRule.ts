import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ThroneRule } from './card-effect/ThroneRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { InfluenceUtils } from './utils/InfluenceUtils'

export class ChooseActionRule extends PlayerTurnRule {
  onRuleStart() {
    this.forget(Memory.PlacedCard)
    const canInfluence = new InfluenceUtils(this.game, this.hand).influenceMoves.length
    if (canInfluence) return []

    return [
      this.rules().startRule(RuleId.Recruit)
    ]
  }

  getPlayerMoves() {
    return [
      this.rules().startRule(RuleId.Influence),
      this.rules().startRule(RuleId.Recruit),
      ...new InfluenceUtils(this.game, this.hand).influenceMoves
    ]
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return []
    if (move.location.type === LocationType.PlayerInfluenceZone) {
      new ThroneRule(this.game, this.player).onInfluence(move)
      return [this.rules().startRule(RuleId.Influence)]
    }
    return []
  }

  get hand() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(this.player)
  }
}