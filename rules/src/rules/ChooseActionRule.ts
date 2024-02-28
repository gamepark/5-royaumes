import { PlayerTurnRule } from '@gamepark/rules-api'
import { Realm } from '../cards/Realm'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseActionRule extends PlayerTurnRule {
  onRuleStart() {
    const hand = this.hand
    console.log(hand.filter((item) => item.id.back === Realm.ReligiousOrder).length)
    if (!hand.filter((item) => item.id.back === Realm.ReligiousOrder).length) return []

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