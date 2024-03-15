/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { DiscardDescription } from './description/DiscardDescription'

export class DiscardLocator extends DeckLocator {

  locationDescription = new DiscardDescription()


  delta = { x: -0.03, y: -0.04 }

  getCoordinates(item: MaterialItem) {
    const coordinates = { ...this.locationDescription.coordinates, z: 0.05 }
    if (item.selected) {
      coordinates.x = 10
      coordinates.y = -3
      coordinates.z += 0
    }

    return coordinates
  }

}

export const discardLocator = new DiscardLocator()