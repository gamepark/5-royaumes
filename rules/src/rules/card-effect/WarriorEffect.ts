import { MoveItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'
import { Effect } from './Effect'

export class WarriorEffect extends Effect {

  onInfluence(move: MoveItem) {
    const item = this.card.getItem()!
    if (item.id.back !== move.location.id) return
    const influenceCard = this.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    if ((influenceCard.location.x! + 1) !== 4) return
    if (!this.canUseWarrior) return
    this.addActivation()
  }

  get moves() {
    return [this.rules().startRule(RuleId.Warrior)]
  }

  get canUseWarrior() {
    return (this.opponentCastle.getItem()?.quantity ?? 0) > 0
      || this.opponentTitan.length
      || this.opponentConsul.length
  }

  get opponentCastle() {
    return this.material(MaterialType.Castle).player((p) => p !== this.player)
  }

  get opponentTitan() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player((p) => p !== this.player)
  }

  get opponentConsul() {
    return this.material(MaterialType.CharacterCard).location(LocationType.Council).player((p) => p !== this.player)
  }

}