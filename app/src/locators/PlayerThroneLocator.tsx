import { ItemContext, ItemLocator, MaterialContext } from '@gamepark/react-game'
/** @jsxImportSource @emotion/react */
import { MaterialItem } from '@gamepark/rules-api'

export class PlayerThroneLocator extends ItemLocator {

  getPosition(item: MaterialItem, context: ItemContext) {
    return this.getThronePosition(item.id, context)
  }

  getThronePosition(playerId: number, { rules, player }: MaterialContext) {
    if (playerId === (player ?? rules.players[0])) {
      return { x: -7, y: 9, z: 0 }
    }

    return { x: 35, y: -15, z: 0 }
  }

  getRotateZ(item: MaterialItem, { rules, player }: ItemContext): number {
    return item.id === (player ?? rules.players[0])? 0: 180
  }
}

export const playerThroneLocator = new PlayerThroneLocator()