import { HandLocator, ItemContext } from '@gamepark/react-game'
/** @jsxImportSource @emotion/react */
import { Location, MaterialItem } from '@gamepark/rules-api'

export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, { rules, player }: ItemContext) {
    if (location.player === (player ?? rules.players[0])) {
      return { x: 10, y: -3, z: 0.05 }
    }

    return { x: 10, y: -3, z: 0.05 }
  }

  getBaseAngle(item: MaterialItem, { player, rules }: ItemContext): number {
    return item.location.player === (player ?? rules.players[0]) ? 0 : 180
  }
}

export const playerHandLocator = new PlayerHandLocator()