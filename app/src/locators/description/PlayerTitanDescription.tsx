/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

export class PlayerTitanDescription extends LocationDescription {
  width = 6.35 + 0.4
  height = 2 * 8.89
  borderRadius = 0.5

  alwaysVisible = true

  extraCss = css`
    border-radius: 0.7em;
    border: 0.05em dashed white;
  `

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => ({
      type: LocationType.PlayerTitan,
      player,
    }))
  }

  getCoordinates(location: Location<number, number>, context: LocationContext): Coordinates | undefined {
    return this.getTitanPosition(location, context)
  }

  getTitanPosition(location: Location, { rules, player }: MaterialContext) {
    if (location.player === (player ?? rules.players[0])) {
      return {
        x: 15 - (this.width + 1),
        y: 13.4,
        z: 0 }
    }

    return {
      x: 13 + (this.width + 1),
      y: -19.4,
      z: 0 }
  }

  getRotateZ(location: Location<number, number>, { rules, player }: LocationContext): number {
    return location.player === (player ?? rules.players[0])? 0: 180
  }
}