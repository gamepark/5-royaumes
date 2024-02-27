import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class SorcererRule extends PlayerTurnRule {

  getPlayerMoves() {
    const discard = this.discard
    return discard.moveItems({
      type: LocationType.PlayerHand,
      player: this.player
    })
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move) || move.location.type !== LocationType.PlayerHand) return []
    return [this.rules().startRule(RuleId.ChooseAction)]
  }

  get discard() {
    return this.material(MaterialType.CharacterCard).location(LocationType.Discard)
  }
}