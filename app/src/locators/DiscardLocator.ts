/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { DeckLocator, isItemContext, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { DiscardDescription } from './description/DiscardDescription'

export class DiscardLocator extends DeckLocator {

  locationDescription = new DiscardDescription()
  location = { type: LocationType.Discard }

  gap = { x: -0.03, y: -0.04 }

  getGap(_location: Location, context: MaterialContext) {
    if (!isItemContext(context)) return {}
    return this.gap
  }

  getCoordinates(_location: Location, context: MaterialContext) {

    const { rules } = context
    const coordinates = { x: -28, y: 18, z: 0.05 }
    if (isItemContext(context)) {
      if (rules.material(context.type).getItem(context.index).selected) {
        coordinates.x = 10
        coordinates.y = -3
        coordinates.z += 0
      }
    } else {
      const topDiscardCard = rules.material(MaterialType.CharacterCard).location(LocationType.Discard).maxBy((item) => item.location.x!)
      const x = topDiscardCard.getItem()?.location.x
      if (!x) return coordinates
      return {
        x: coordinates.x + (Math.min(x + 1, 20) * -0.03) + (0.015 * Math.min(x + 1, 20)),
        y: coordinates.y + (Math.min(x + 1, 20) * -0.04) + (0.02 * Math.min(x + 1, 20)),
        z: 10
      }
    }

    return coordinates
  }

}

export const discardLocator = new DiscardLocator()