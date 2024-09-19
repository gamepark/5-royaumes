/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { ListLocator, LocationContext, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { PlayerTitanDescription } from './description/PlayerTitanDescription'

export class PlayerTitanLocator extends ListLocator {

  locationDescription = new PlayerTitanDescription()

  getGap(location: Location, context: MaterialContext) {
    const { rules, player } = context
    const y = (location.player === (player ?? rules.players[0])) ? -3 : 3
    return { y }
  }

  getAreaCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    if (location.player === player) {
      return { x: 13 - (this.locationDescription.width + 1), y: 11.9 }
    } else {
      return { x: 13 + (this.locationDescription.width + 1), y: -17.9 }
    }
  }

  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    if (location.player === player) {
      return { x: 13 - (this.locationDescription.width + 1), y: 17.7 }
    } else {
      return { x: 13 + (this.locationDescription.width + 1), y: -23.7 }
    }
  }

  getRotateZ(location: Location, { rules, player = rules.players[0] }: LocationContext) {
    return location.player === player ? 0 : 180
  }

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => ({
      type: LocationType.PlayerTitan,
      player
    }))
  }

}

export const playerTitanLocator = new PlayerTitanLocator()