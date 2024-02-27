import { isMoveItemType, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Effect } from './Effect'

export class OuranosEffect extends Effect {
  onRecruit(move: MoveItem): MaterialMove[] {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return []
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