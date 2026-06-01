import { MoveItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'
import { Effect } from './Effect'
import { CardId } from '../../cards/Card'

export class SorcererEffect extends Effect {

  onInfluence(move: MoveItem) {
    const influenceCard = this.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    if ((this.card.getItem()!.id as CardId).back !== move.location?.id) return
    if (![3, 5].includes(influenceCard.location.x! + 1) || !this.discard.length) return
    this.addActivation()
  }

  get moves() {
    return [this.rules().startRule(RuleId.Sorcerer)]
  }

  get discard() {
    return this.material(MaterialType.CharacterCard).location(LocationType.Discard)
  }

}