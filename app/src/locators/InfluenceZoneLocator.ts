/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { InfluenceZoneDescription } from './description/InfluenceZoneDescription'

export class InfluenceZoneLocator extends LineLocator {

  locationDescription = new InfluenceZoneDescription()

  delta = { y: 0.3 }

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    return {
      ...this.locationDescription.getInfluenceZonePosition(item.location, context),
      z: 0.05
    }
  }

  rotateZ = -90

}

export const influenceZoneLocator = new InfluenceZoneLocator()