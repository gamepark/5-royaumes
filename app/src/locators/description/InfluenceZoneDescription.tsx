/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { baseRealms } from '@gamepark/5-royaumes/cards/Realm'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { playerColorCode } from '../../panels/PlayerPanels'

export class InfluenceZoneDescription extends LocationDescription {
  width = 6.35 + 0.4
  height = 2 * 8.89
  borderRadius = 0.5

  alwaysVisible = true

  getExtraCss(location: Location) {
    const realm = location.id
    return css`
      border-radius: 0.7em;
      border: 0.05em dashed white;
      background: ${playerColorCode[realm]};
      background: linear-gradient(180deg, ${playerColorCode[realm]}60 0%, ${playerColorCode[realm]}00 70%);
    `
  }

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => {
      return baseRealms
        .map(id => ({
          type: LocationType.PlayerInfluenceZone,
          player,
          id: id
        }))
    })
  }

  canShortClick(move: MaterialMove, location: Location, context: MaterialContext): any {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return false
    const { rules } = context
    const item = rules.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    if (item.location.type === LocationType.Discard && move.location.type === location.type && move.location.id === location.id && move.location.player === location.player) return true

    return super.canShortClick(move, location, context)
  }

  getCoordinates(location: Location, context: LocationContext): Coordinates | undefined {
    const position = this.getInfluenceZonePosition(location, context)
    const { rules } = context
    if (rules.game.rule?.id === RuleId.Sorcerer && rules.game.rule?.player === location.player && rules.material(MaterialType.CharacterCard).selected().length) position.z += 10
    return position
  }

  getInfluenceZonePosition(location: Location, { rules, player }: MaterialContext) {
    const xIndex = location.id - 1
    if (location.player === (player ?? rules.players[0])) {
      return {
        x: 13 + (xIndex * (this.width + 0.4)),
        y: 13.4,
        z: 0 }
    }

    return {
      x: 13 - (xIndex * (this.width + 0.4)),
      y: -19.4,
      z: 0 }
  }

  getRotateZ(location: Location, { rules, player }: LocationContext): number {
    return location.player === (player ?? rules.players[0])? 0: 180
  }
}