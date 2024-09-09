/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { ComponentSize, DropAreaDescription, LocationContext, MaterialContext } from '@gamepark/react-game'
import { isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { AlkaneSquareHelp } from '../help/AlkaneSquareHelp'

export class AlkaneSquareDescription extends DropAreaDescription {
  width = 6.35
  height = 8.89
  borderRadius = 0.5



  getLocationSize(location: Location, context: LocationContext): ComponentSize {
    if (location.x !== undefined && location.y !== undefined) return super.getLocationSize(location, context)
    return {
      width: this.width * 3.4,
      height: this.height * 3.3
    }
  }

  getExtraCss(location: Location, context: MaterialContext) {
    const extra = super.getExtraCss(location, context)
    if (location.x === undefined && location.y === undefined) return [alkaneSquareCss]
    return extra
  }

  extraCss = css`
    border: 0.05em solid white;
  `

  help = AlkaneSquareHelp


  canShortClick(move: MaterialMove, location: Location): boolean {
    if (!isMoveItemType(MaterialType.CharacterCard)(move) || move.location?.type !== location.type) return false
    return move.location?.x === location.x && move.location?.y === location.y
  }

  isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext): any {
    if (location.x === undefined && location.y === undefined) return false
    return super.isMoveToLocation(move, location, context)
  }
}

const alkaneSquareCss = css`
  background-color: rgba(255, 255, 255, 0.4);
  pointer-events: none
`