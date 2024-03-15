/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

export class PlayerThroneDescription extends LocationDescription {
  width = 6.35
  height = 8.89

  alwaysVisible = true


  extraCss = css`
    pointer-events: none;
  `

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => ({
      type: LocationType.PlayerThrone,
      player
    }))
  }

  getCoordinates(location: Location, context: LocationContext): Coordinates | undefined {
    return this.getThronePosition(location.player!, context)
  }

  getThronePosition(playerId: number, { rules, player }: MaterialContext) {
    if (playerId === (player ?? rules.players[0])) {
      return { x: -9, y: 9, z: 0 }
    }

    return { x: 35, y: -15, z: 0 }
  }
}