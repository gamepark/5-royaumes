/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator, LocationContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { InfluenceZoneDescription } from './description/InfluenceZoneDescription'

export class InfluenceZoneLocator extends LineLocator {

  locationDescription = new InfluenceZoneDescription()

  getDelta(item: MaterialItem, { rules, player }: ItemContext): Partial<Coordinates> {
    const y = (item.location.player === (player ?? rules.players[0]))? 1.5 : -1.5
    return { y }
  }

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const baseCoordinates = this.locationDescription.getInfluenceZonePosition(item.location, context)
    const { rules, player } = context
    const deltaY = (item.location.player === (player ?? rules.players[0]))? -4.25 : 4.25
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

export const influenceZoneLocator = new InfluenceZoneLocator()