/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import TitanIcon from '../../images/icons/titan.png'
import { PlayerTitanHelp } from '../help/PlayerTitanHelp'
import { EndGameCardScoring } from './EndGameCardScoring'

export class PlayerTitanDescription extends LocationDescription {
  width = 6.35 + 0.4
  height = 21
  borderRadius = 0.7

  alwaysVisible = true

  extraCss = css`
    background: no-repeat center 18em / 35% url(${TitanIcon}), linear-gradient(0deg, #ffffff70 0%, #ffffff00 70%);
  `

  help = PlayerTitanHelp
  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => ({
      type: LocationType.PlayerTitan,
      player,
    }))
  }

  getCoordinates(location: Location, context: LocationContext): Coordinates | undefined {
    return this.getTitanPosition(location, context)
  }

  canLongClick(): boolean {
    return false
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