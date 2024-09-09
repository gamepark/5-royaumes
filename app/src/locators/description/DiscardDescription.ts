import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { ComponentSize, DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'
import { DiscardHelp } from '../help/DiscardHelp'

export class DiscardDescription extends DropAreaDescription {

  location = { type: LocationType.Discard }

  width = characterCardDescription.width + 0.6
  height = characterCardDescription.height + 0.6
  borderRadius = characterCardDescription.borderRadius

  getLocationSize(_location: Location, context: MaterialContext): ComponentSize {
    const { rules } = context
    const topDiscardCard = rules.material(MaterialType.CharacterCard).location(LocationType.Discard).maxBy((item) => item.location.x!)
    const x = topDiscardCard.getItem()?.location.x
    const size = {
      width: characterCardDescription.width,
      height: characterCardDescription.height
    }

    if (!x) return size
    return {
      width: characterCardDescription.width + (0.03 * Math.min(x, 19)),
      height: characterCardDescription.height + (0.04 * Math.min(x, 19))
    }
  }

  help = DiscardHelp
}
