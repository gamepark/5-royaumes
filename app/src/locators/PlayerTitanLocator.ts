/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { isItemContext, ListLocator, LocationContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { PlayerTitanDescription } from './description/PlayerTitanDescription'

export class PlayerTitanLocator extends ListLocator {

  locationDescription = new PlayerTitanDescription()

  getGap(location: Location, context: MaterialContext): Partial<Coordinates> {
    const { rules, player } = context
    if (!isItemContext(context)) return {}
    const y = (location.player === (player ?? rules.players[0]))? -3 : 3
    return { y }
  }

  getAreaCoordinates(location: Location, context: MaterialContext) {
    return this.getTitanPosition(location, context)
  }

  getCoordinates(location: Location, context: MaterialContext): Coordinates {
    const baseCoordinates = this.getTitanPosition(location, context)
    const { rules, player } = context
    const deltaY = (location.player === (player ?? rules.players[0]))? 5.8 : -5.8
    return {
      x: baseCoordinates.x,
      y: baseCoordinates.y + deltaY,
      z: 0.05
    }
  }

  getTitanPosition(location: Location, context: MaterialContext) {
    const { rules, player } = context
    if (location.player === (player ?? rules.players[0])) {
      return {
        x: 13 - (this.locationDescription.width + 1),
        y: 11.9,
        z: 0 }
    }

    return {
      x: 13 + (this.locationDescription.width + 1),
      y: -17.9,
      z: 0 }
  }

  getRotateZ(location: Location, context: LocationContext): number {
    const { rules, player } = context
    return location.player === (player ?? rules.players[0])? 0: 180
  }

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => ({
      type: LocationType.PlayerTitan,
      player,
    }))
  }

}

export const playerTitanLocator = new PlayerTitanLocator()