/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { characterCardDescription } from '../material/descriptions/CharacterCardDescription'
import { CouncilDescription } from './description/CouncilDescription'
import { playerThroneLocator } from './PlayerThroneLocator'

export class CouncilLocator extends Locator {

  locationDescription = new CouncilDescription(characterCardDescription)

  getCoordinates(location: Location, context: ItemContext): Coordinates {
    const { rules, player } = context
    const playerId = location.player!
    const baseCoordinates = playerThroneLocator.getThronePosition(playerId, context)
    const itsFirst = playerId === (player ?? rules.players[0])
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

    baseCoordinates.z = 5
    return baseCoordinates
  }


  getRotateZ(location: Location, { rules, player }: ItemContext): number {
    return location.player === (player ?? rules.players[0])? 0: 180
  }

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => {
      return Array.from(Array(4))
        .map((_, x) => ({
          type: LocationType.Council,
          player,
          x
        }))
    })
  }

}

export const playerThroneRoomLocator = new CouncilLocator()