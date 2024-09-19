/** @jsxImportSource @emotion/react */
import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { DiscardDescription } from './description/DiscardDescription'

class DiscardLocator extends DeckLocator {

  locationDescription = new DiscardDescription()

  coordinates = { x: -28, y: 18 }

  getItemCoordinates(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    if (item.selected) {
      return { x: 10, y: -3 }
    }
    return super.getItemCoordinates(item, context)
  }
}

export const discardLocator = new DiscardLocator()