import { ItemContext, PileLocator } from '@gamepark/react-game'
/** @jsxImportSource @emotion/react */
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerCastleDescription } from './description/PlayerCastleDescription'

export class PlayerCastleLocator extends PileLocator {

  radius = 1.8

  locationDescription = new PlayerCastleDescription()

  getCoordinates(item: MaterialItem, context: ItemContext) {
    return this.locationDescription.getCoordinates(item.location, context)
  }

  getRotateZ(item: MaterialItem, { rules, player }: ItemContext): number {
    return item.location.player === (player ?? rules.players[0]) ? 0 : 180
  }
}

export const playerCastleLocator = new PlayerCastleLocator()