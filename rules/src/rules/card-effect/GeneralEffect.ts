import { MaterialMove, MoveItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { Effect } from './Effect'

export class GeneralEffect extends Effect {

  onInfluence(move: MoveItem): MaterialMove[] {
    const influenceCard = this.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    const lineSize = this
      .material(MaterialType.CharacterCard)
      .location((location) => location.type === LocationType.PlayerInfluenceZone && location.x === influenceCard.location.x)
      .player(this.player)
      .length

    if (lineSize !== 5) return []
    this.memorize(Memory.FreeTurns, (turns) => (turns ?? 0) + 1)
    return []
  }
}