import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class InfluenceRule extends PlayerTurnRule {
  onRuleStart() {
    const hand = this.hand
    const realms = hand.getItem()!.id.back
    const moves: MaterialMove[] = this
      .hand
      .moveItems({
        type: LocationType.PlayerInfluenceZone,
        id: realms,
        player: this.player
      })

    moves.push(this.rules().startPlayerTurn(RuleId.DrawBannerCard, this.nextPlayer))

    return moves;
  }

  get hand() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(this.player)
  }
}