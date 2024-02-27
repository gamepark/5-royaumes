/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator, LocationContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { PlayerTitanDescription } from './description/PlayerTitanDescription'

export class PlayerTitanLocator extends LineLocator {

  locationDescription = new PlayerTitanDescription()

  getDelta(item: MaterialItem, { rules, player }: ItemContext): Partial<Coordinates> {
    const y = (item.location.player === (player ?? rules.players[0]))? -3 : 3
    return { y }
  }

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const baseCoordinates = this.locationDescription.getTitanPosition(item.location, context)
    const { rules, player } = context
    const deltaY = (item.location.player === (player ?? rules.players[0]))? 4.25 : -4.25
    return {
      x: baseCoordinates.x,
      y: baseCoordinates.y + deltaY,
      z: 0.05
    }
  }

  getRotateZ(item: MaterialItem, context: LocationContext): number {
    return this.locationDescription.getRotateZ(item.location, context)
  }

}

export const playerTitanLocator = new PlayerTitanLocator()