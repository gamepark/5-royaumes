/** @jsxImportSource @emotion/react */
import { ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { throneCardDescription } from '../material/descriptions/ThroneCardDescription'
import { PlayerCastleDescription } from './description/PlayerCastleDescription'
import { playerThroneLocator } from './PlayerThroneLocator'

export class PlayerCastleLocator extends PileLocator {

  radius = 1.8

  locationDescription = new PlayerCastleDescription()

  getRotateZ(location: Location, context: ItemContext): number {
    const { player, rules } = context
    return location.player === (player ?? rules.players[0]) ? 0 : 180
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const playerId = location.player!
    const position = playerThroneLocator.getThronePosition(playerId, context)
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