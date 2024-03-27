import { MoveItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Effect } from './Effect'

export class QueenEffect extends Effect {

  onInfluence(move: MoveItem) {
    const item = this.card.getItem()!
    if (item.id.back !== move.location?.id) return
    const influenceCard = this.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    if (![3, 4, 5].includes(influenceCard.location.x! + 1)) return
    this.addActivation()
  }

  get moves() {
    return [
      this.material(MaterialType.Castle).createItem({ location: { type: LocationType.PlayerCastle, player: this.player } })
    ]
  }

}