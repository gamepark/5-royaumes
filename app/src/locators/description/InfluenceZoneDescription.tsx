/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'

export class InfluenceZoneDescription extends LocationDescription {
  width = 6.35 + 0.4
  height = 2 * 8.89
  borderRadius = 0.5

  alwaysVisible = true

  extraCss = css`
    border-radius: 0.7em;
    border: 0.05em dashed white;
  `

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => {
      return Array.from(Array(5))
        .map((_, id) => ({
          type: LocationType.PlayerInfluenceZone,
          player,
          id: id + 1,
          x: 0
        }))
    })
  }

  getCoordinates(location: Location<number, number>, context: LocationContext): Coordinates | undefined {
    return this.getInfluenceZonePosition(location, context)
  }

  getInfluenceZonePosition(location: Location, { rules, player }: MaterialContext) {
    const xIndex = location.id - 1
    if (location.player === (player ?? rules.players[0])) {
      return {
        x: 15 + (xIndex * (this.width + 0.4)),
        y: 13.4,
        z: 0 }
    }

    return {
      x: 13 - (xIndex * (this.width + 0.4)),
      y: -19.4,
      z: 0 }
  }

  getRotateZ(location: Location<number, number>, { rules, player }: LocationContext): number {
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