import { ItemContext, PileLocator } from '@gamepark/react-game'
/** @jsxImportSource @emotion/react */
import { MaterialItem } from '@gamepark/rules-api'
import { throneCardDescription } from '../material/descriptions/ThroneCardDescription'
import { playerThroneLocator } from './PlayerThroneLocator'

export class PlayerCastleLocator extends PileLocator {

  radius = 2

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const playerId = item.location.player!
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

  getRotateZ(item: MaterialItem, { rules, player }: ItemContext): number {
    return item.location.player === (player ?? rules.players[0]) ? 0 : 180
  }
}

export const playerCastleLocator = new PlayerCastleLocator()