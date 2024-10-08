import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Effect } from './Effect'

export class PapesseEffect extends Effect {
  onInfluence(move: MoveItem) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return

    const influenceCard = this.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    if ((influenceCard.location.x! + 1) !== 4) return
    this.addActivation()
  }

  get moves() {
    return [
      this.material(MaterialType.Castle).createItem({
        location: {
          type: LocationType.PlayerCastle,
          player: this.player
        },
        quantity: 2
      })
    ]
  }
}