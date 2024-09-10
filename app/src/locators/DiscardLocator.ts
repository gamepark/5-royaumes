/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { DiscardDescription } from './description/DiscardDescription'

export class DiscardLocator extends DeckLocator {

  locationDescription = new DiscardDescription()
  location = { type: LocationType.Discard }

  gap = { x: -0.03, y: -0.04 }

  coordinates = { x: -28, y: 18 }

  getItemCoordinates(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    if (item.selected) {
      return {
        x: 10,
        y: -3,
        z: 0.05
      }
    }

    return super.getItemCoordinates(item, context)
  }

}

export const discardLocator = new DiscardLocator()