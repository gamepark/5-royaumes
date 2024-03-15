/** @jsxImportSource @emotion/react */

import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { LocationDescription } from '@gamepark/react-game/dist/components/material/locations/LocationDescription'
import { LocationContext, MaterialContext } from '@gamepark/react-game/dist/locators/ItemLocator'
import { Coordinates, Location } from '@gamepark/rules-api/dist/material/location/Location'
import { throneCardDescription } from '../../material/descriptions/ThroneCardDescription'
import { playerThroneLocator } from '../PlayerThroneLocator'

export class PlayerCastleDescription extends LocationDescription {
  height = 6
  width = 6
  borderRadius = 5

  getLocations(context: MaterialContext) {
    const { player } = context
    if (!player) return []
    return [{ type: LocationType.PlayerCastle, player }]
  }

  getCoordinates(location: Location, context: LocationContext): Coordinates {
    const playerId = location.player!
    const position = playerThroneLocator.locationDescription.getThronePosition(playerId, context)
    const { rules, player } = context
    if (playerId === (player ?? rules.players[0])) {
      position.x -= 0.8 + throneCardDescription.width
      position.y -= 0.8 + 1.5 * throneCardDescription.width
    } else {
      position.x += 0.8 + throneCardDescription.width
      position.y += 0.8 + 1.5 * throneCardDescription.width
    }

    return position
  }

}