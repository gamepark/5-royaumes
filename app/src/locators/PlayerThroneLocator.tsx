import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { Locator, MaterialContext } from '@gamepark/react-game'
/** @jsxImportSource @emotion/react */
import { Location } from '@gamepark/rules-api'
import { PlayerThroneDescription } from './description/PlayerThroneDescription'

export class PlayerThroneLocator extends Locator {

  locationDescription = new PlayerThroneDescription()

  getCoordinates(location: Location, context: MaterialContext) {
    return this.getThronePosition(location.player!, context)
  }

  getRotateZ(location: Location, context: MaterialContext): number {
    const { rules, player } = context
    return location.player === (player ?? rules.players[0])? 0: 180
  }

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => ({
      type: LocationType.PlayerThrone,
      player
    }))
  }

  getThronePosition(playerId: number, { rules, player }: MaterialContext) {
    if (playerId === (player ?? rules.players[0])) {
      return { x: -9, y: 8.65, z: 0 }
    }

    return { x: 35, y: -14.65, z: 0 }
  }
}

export const playerThroneLocator = new PlayerThroneLocator()