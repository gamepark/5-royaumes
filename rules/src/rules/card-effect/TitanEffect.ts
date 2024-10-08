import { MaterialMove, MoveItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Effect } from './Effect'

export class TitanEffect extends Effect {

  onRecruit(_move: MoveItem): MaterialMove[] {
    return [
      this.material(MaterialType.Castle).createItem({
        location: {
          type: LocationType.PlayerCastle,
          player: this.player
        }
      })
    ]
  }

}