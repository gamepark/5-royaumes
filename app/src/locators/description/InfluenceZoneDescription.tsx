/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

export class InfluenceZoneDescription extends LocationDescription {
  width = 6.35 + 0.4
  height = 2 * 8.89

  alwaysVisible = true

  extraCss = css`
    border-radius: 0.5em;
    border: 0.05em dashed white;
  `

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => {
      return Array.from(Array(5))
        .map((_, id) => ({
          type: LocationType.PlayerInfluenceZone,
          player,
          id,
          x: 0
        }))
    })
  }

  getCoordinates(location: Location<number, number>, context: LocationContext): Coordinates | undefined {
    return this.getInfluenceZonePosition(location, context)
  }

  getInfluenceZonePosition(location: Location, { rules, player }: MaterialContext) {
    if (location.player === (player ?? rules.players[0])) {
      return {
        x: 15 + (location.id * (this.width + 0.4)),
        y: 13.4,
        z: 0 }
    }

    return {
      x: 13 - (location.id * (this.width + 0.4)),
      y: -19.4,
      z: 0 }
  }

  getRotateZ(location: Location<number, number>, { rules, player }: LocationContext): number {
    return location.player === (player ?? rules.players[0])? 0: -180
  }
}