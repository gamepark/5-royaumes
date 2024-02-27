/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'

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

  getCoordinates(location: Location, context: LocationContext): Coordinates | undefined {
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

  getRotateZ(location: Location, { rules, player }: LocationContext): number {
    return location.player === (player ?? rules.players[0])? 0: 180
  }

  isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext): any {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return super.isMoveToLocation(move, location, context)
    const { rules } = context
    const item = rules.material(MaterialType.CharacterCard).getItem(move.itemIndex)
    if (item?.location.type === LocationType.Discard) return false
    return super.isMoveToLocation(move, location, context)
  }
}