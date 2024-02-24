/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'

export class AlkaneSquareDescription extends LocationDescription {
  width = 6.35
  height = 8.89

  alwaysVisible = true

  extraCss = css`
    border-radius: 0.5em;
    border: 0.05em dashed white;
  `

  getLocations() {
    const locations: Location[] = []
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        locations.push({
          type: LocationType.AlkaneSquare,
          x,
          y
        })
      }
    }

    return locations
  }

  getCoordinates(location: Location<number, number>, context: LocationContext): Coordinates | undefined {
    return this.getSquarePosition(location, context)
  }

  getSquarePosition(location: Location, _context: MaterialContext) {
    const baseX = -41
    const baseY = -19
    return {
      x: baseX + (location.x! * (characterCardDescription.width + 0.2)),
      y: baseY + (location.y! * (characterCardDescription.height + 0.2)),
      z: 0
    }
  }
}