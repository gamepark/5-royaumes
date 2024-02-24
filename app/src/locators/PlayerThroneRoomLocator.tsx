/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { PlayerThroneRoomDescription } from './description/PlayerThroneRoomDescription'

export class PlayerThroneRoomLocator extends ItemLocator {

  locationDescription = new PlayerThroneRoomDescription()

  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    return this.locationDescription.getLocationPosition(item.location, context)
  }

}

export const playerThroneRoomLocator = new PlayerThroneRoomLocator()