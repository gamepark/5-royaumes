/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { characterCardDescription } from '../material/descriptions/CharacterCardDescription'
import { CouncilDescription } from './description/CouncilDescription'
import { playerThroneLocator } from './PlayerThroneLocator'

class CouncilLocator extends Locator {

  locationDescription = new CouncilDescription(characterCardDescription)

  getCoordinates(location: Location, context: MaterialContext) {
    const player = context.player ?? context.rules.players[0]
    const baseCoordinates = playerThroneLocator.getCoordinates(location, context)
    const itsFirst = location.player === player
    switch (location.x) {
      case 1:
        if (itsFirst) {
          baseCoordinates.x += (characterCardDescription.width + 0.4)
        } else {
          baseCoordinates.x -= (characterCardDescription.width + 0.4)
        }
        break
      case 2:
        if (itsFirst) {
          baseCoordinates.y += (characterCardDescription.height + 0.4)
        } else {
          baseCoordinates.y -= (characterCardDescription.height + 0.4)
        }
        break
      case 3:
        if (itsFirst) {
          baseCoordinates.x -= (characterCardDescription.width + 0.4)
        } else {
          baseCoordinates.x += (characterCardDescription.width + 0.4)
        }
        break
      default:
        if (itsFirst) {
          baseCoordinates.y -= (characterCardDescription.height + 0.4)
        } else {
          baseCoordinates.y += (characterCardDescription.height + 0.4)
        }
        break
    }
    return baseCoordinates
  }

  getRotateZ(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? 0 : 180
  }

  getLocations({ player }: MaterialContext) {
    if (player === undefined) return []
    return Array.from(Array(4))
      .map((_, x) => ({
        type: LocationType.Council,
        player,
        x
      }))
  }

}

export const playerThroneRoomLocator = new CouncilLocator()