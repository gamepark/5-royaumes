import { PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from './RuleId'

export class ChooseActionRule extends PlayerTurnRule {
  getPlayerMoves() {
    return [
      this.rules().startRule(RuleId.Influence),
      this.rules().startRule(RuleId.Recruit),
    ]
  }
}