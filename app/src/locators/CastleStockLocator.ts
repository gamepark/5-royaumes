/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'

class CastleStockLocator extends PileLocator {
  coordinates = { x: -44, y: 18 }
  radius = 2
}

export const castleStockLocator = new CastleStockLocator()