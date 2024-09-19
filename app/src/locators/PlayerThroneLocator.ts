import { Locator, MaterialContext } from '@gamepark/react-game'
/** @jsxImportSource @emotion/react */
import { Location } from '@gamepark/rules-api'

class PlayerThroneLocator extends Locator {

  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    if (location.player === player) {
      return { x: -9, y: 8.65 }
    } else {
      return { x: 35, y: -14.65 }
    }
  }

  getRotateZ(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? 0 : 180
  }
}

export const playerThroneLocator = new PlayerThroneLocator()