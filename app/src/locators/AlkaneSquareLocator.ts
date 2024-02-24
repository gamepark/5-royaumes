/** @jsxImportSource @emotion/react */
import { ItemLocator, LocationContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { AlkaneSquareDescription } from './description/AlkaneSquareDescription'

export class AlkaneSquareLocator extends ItemLocator {

  locationDescription = new AlkaneSquareDescription()

  getPosition(item: MaterialItem, context: LocationContext): Coordinates {
    return {
      ...this.locationDescription.getSquarePosition(item.location, context),
      z: 0.05
    }
  }
}

export const alkaneSquareLocator = new AlkaneSquareLocator()