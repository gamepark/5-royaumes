import { ItemContext, ItemLocator } from '@gamepark/react-game'
/** @jsxImportSource @emotion/react */
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerThroneDescription } from './description/PlayerThroneDescription'

export class PlayerThroneLocator extends ItemLocator {

  locationDescription = new PlayerThroneDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    return this.locationDescription.getThronePosition(item.id, context)
  }

  getRotateZ(item: MaterialItem, { rules, player }: ItemContext): number {
    return item.id === (player ?? rules.players[0])? 0: 180
  }
}

export const playerThroneLocator = new PlayerThroneLocator()