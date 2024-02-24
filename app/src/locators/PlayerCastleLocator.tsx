import { ItemContext, LineLocator } from '@gamepark/react-game'
/** @jsxImportSource @emotion/react */
import { MaterialItem } from '@gamepark/rules-api'
import { throneCardDescription } from '../material/descriptions/ThroneCardDescription'
import { playerThroneLocator } from './PlayerThroneLocator'

export class PlayerCastleLocator extends LineLocator {


  getCoordinates(item: MaterialItem, context: ItemContext) {
    const playerId = item.location.player!
    const position = playerThroneLocator.getThronePosition(playerId, context)
    const { rules, player } = context
    if (playerId === (player ?? rules.players[0])) {
      position.x -= 0.8 + throneCardDescription.width * 2
    } else {
      position.x += 0.8 + throneCardDescription.width * 2
    }

    return position
  }

  getRotateZ(item: MaterialItem, { rules, player }: ItemContext): number {
    return item.location.player === (player ?? rules.players[0]) ? 0 : 180
  }
}

export const playerCastleLocator = new PlayerCastleLocator()