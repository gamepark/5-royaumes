/** @jsxImportSource @emotion/react */
import { HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { PlayerHandDescription } from './description/PlayerHandDescription'

export class PlayerHandLocator extends HandLocator {
  locationDescription = new PlayerHandDescription()
  getCoordinates(location: Location, { rules, player }: MaterialContext) {
    if (location.player === (player ?? rules.players[0])) {
      return { x: 10, y: -3, z: 0.05 }
    }

    return { x: 10, y: -3, z: 0.05 }
  }

  getBaseAngle(location: Location, context: MaterialContext): number {
    const { player, rules } = context
    return location.player === (player ?? rules.players[0]) ? 0 : 180
  }
}

export const playerHandLocator = new PlayerHandLocator()