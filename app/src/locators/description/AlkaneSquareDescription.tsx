/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { AlkaneSquareRule } from '@gamepark/5-royaumes/rules/utils/AlkaneSquareRule'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'

export class AlkaneSquareDescription extends LocationDescription {
  width = 6.35
  height = 8.89

  alwaysVisible = true

  extraCss = css`
    border-radius: 0.5em;
    border: 0.05em dashed white;
  `

  getLocations({ rules }: MaterialContext) {
    return new AlkaneSquareRule(rules.game).validAlkaneSquare
  }

  getCoordinates(location: Location, context: LocationContext): Coordinates | undefined {
    return this.getSquarePosition(location, context)
  }

  getSquarePosition(location: Location, { rules }: MaterialContext) {
    const alkaneRule = new AlkaneSquareRule(rules.game)
    const baseX = -41
    const baseY = -19
    const minX = alkaneRule.minX
    const minY = alkaneRule.minY
    const computedX = location.x! - (minX ?? 0)
    const computedY = location.y! - (minY ?? 0)
    return {
      x: baseX + (computedX! * (characterCardDescription.width + 0.2)),
      y: baseY + (computedY! * (characterCardDescription.height + 0.2)),
      z: 0
    }
  }


  canShortClick(move: MaterialMove, location: Location): boolean {
    if (!isMoveItemType(MaterialType.CharacterCard)(move) || move.location.type !== location.type) return false
    if (move.location.x !== location.x || move.location.y !== location.y) return false
    return true
  }
}