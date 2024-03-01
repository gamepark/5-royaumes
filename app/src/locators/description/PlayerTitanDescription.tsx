/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import TitanIcon from '../../images/icons/titan.png'
import { EndGameCardScoring } from './EndGameCardScoring'

export class PlayerTitanDescription extends LocationDescription {
  width = 6.35 + 0.4
  height = 21
  borderRadius = 0.5

  alwaysVisible = true

  extraCss = css`
    background: no-repeat center 18em / 35% url(${TitanIcon}), linear-gradient(0deg, #ffffff70 0%, #ffffff00 70%);
  `

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => ({
      type: LocationType.PlayerTitan,
      player,
    }))
  }

  canShortClick(move: MaterialMove, location: Location, context: MaterialContext): any {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return false
    const { rules } = context
    const item = rules.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    if (item.location.type === LocationType.Discard && move.location.type === location.type && move.location.player === location.player) return true

    return super.canShortClick(move, location, context)
  }

  getCoordinates(location: Location, context: LocationContext): Coordinates | undefined {
    return this.getTitanPosition(location, context)
  }

  getTitanPosition(location: Location, { rules, player }: MaterialContext) {
    if (location.player === (player ?? rules.players[0])) {
      return {
        x: 13 - (this.width + 1),
        y: 11.9,
        z: 0 }
    }

    return {
      x: 13 + (this.width + 1),
      y: -17.9,
      z: 0 }
  }

  content = EndGameCardScoring

  getRotateZ(location: Location, { rules, player }: LocationContext): number {
    return location.player === (player ?? rules.players[0])? 0: 180
  }

  isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext): any {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return super.isMoveToLocation(move, location, context)
    const { rules } = context
    const item = rules.material(MaterialType.CharacterCard).getItem(move.itemIndex)
    if (item?.location.type === LocationType.Discard && !item.selected) return false
    return super.isMoveToLocation(move, location, context)
  }

}