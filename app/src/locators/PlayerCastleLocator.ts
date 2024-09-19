/** @jsxImportSource @emotion/react */
import { DropAreaDescription, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { throneCardDescription } from '../material/descriptions/ThroneCardDescription'
import { playerThroneLocator } from './PlayerThroneLocator'

class PlayerCastleLocator extends PileLocator {

  radius = 1.8

  locationDescription = new DropAreaDescription({ width: 6, height: 6, borderRadius: 3 })

  getRotateZ(location: Location, { rules, player = rules.players[0] }: MaterialContext): number {
    return location.player === player ? 0 : 180
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const playerId = location.player!
    const position = playerThroneLocator.getCoordinates(location, context)
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

  /*getLocations(context: MaterialContext) {
    const { player } = context
    if (!player) return []
    return [{ type: LocationType.PlayerCastle, player }]
  }*/
}

export const playerCastleLocator = new PlayerCastleLocator()