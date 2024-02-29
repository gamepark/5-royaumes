import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { InfluenceUtils } from './utils/InfluenceUtils'

export class ChooseActionRule extends PlayerTurnRule {
  onRuleStart() {
    const canInfluence = new InfluenceUtils(this.game, this.hand).influenceMoves.length
    if (canInfluence) return []

    return [
      this.rules().startRule(RuleId.Recruit)
    ]
  }

  getPlayerMoves() {

    return [
      this.rules().startRule(RuleId.Influence),
      this.rules().startRule(RuleId.Recruit)
    ]
  }

  get hand() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(this.player)
  }
}