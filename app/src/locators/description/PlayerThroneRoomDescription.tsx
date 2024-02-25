/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'
import { playerThroneLocator } from '../PlayerThroneLocator'

export class PlayerThroneRoomDescription extends LocationDescription {
  width = 6.35
  height = 8.89

  alwaysVisible = true

  extraCss = css`
    border-radius: 0.5em;
    border: 0.05em dashed white;
    pointer-events: none;
  `

  getLocations({ rules }: MaterialContext<number, number, number>) {
    return rules.players.flatMap((player) => {
      return Array.from(Array(4))
        .map((_, x) => ({
          type: LocationType.PlayerThroneRoom,
          player,
          x
        }))
    })
  }

  getCoordinates(location: Location<number, number>, context: LocationContext): Coordinates | undefined {
    return this.getLocationPosition(location, context)
  }

  getLocationPosition(location: Location, context: MaterialContext): Coordinates {
    const playerId = location.player!
    const baseCoordinates = playerThroneLocator.getThronePosition(playerId, context)
    switch (location.x) {
      case 1:
        baseCoordinates.x += (characterCardDescription.width + 0.4)
        break
      case 2:
        baseCoordinates.y += (characterCardDescription.height + 0.4)
        break
      case 3:
        baseCoordinates.x -= (characterCardDescription.width + 0.4)
        break
      default:
        baseCoordinates.y -= (characterCardDescription.height + 0.4)
        break
    }

    baseCoordinates.z = 0.05
    return baseCoordinates
  }
}