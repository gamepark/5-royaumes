import { Realm } from '@gamepark/5-royaumes/cards/Realm'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'
import { DiscardHelp } from './DiscardHelp'

export class DiscardDescription extends LocationDescription<Realm, MaterialType, LocationType> {

  location = { type: LocationType.Discard }

  width = characterCardDescription.width
  height = characterCardDescription.height
  borderRadius = characterCardDescription.borderRadius
  alwaysVisible = true

  getCoordinates(_location: Location, context: LocationContext) {
    const { rules } = context
    const topDiscardCard = rules.material(MaterialType.CharacterCard).location(LocationType.Discard).maxBy((item) => item.location.x!)
    const x = topDiscardCard.getItem()?.location.x
    if (!x) return this.coordinates
    return {
      ...this.coordinates,
      x: this.coordinates.x + (Math.min(x, 19) * -0.03),
      y: this.coordinates.y + (Math.min(x, 19) * -0.04),
    }
  }

  coordinates = { x: -28, y: 18, z: 10 }

  help = DiscardHelp
}
