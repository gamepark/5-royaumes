/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { CastleStockDescription } from './description/CastleStockDescription'

export class CastleStockLocator extends PileLocator {

  locationDescription = new CastleStockDescription()

  delta = { x: -0.05, y: -0.05}

  coordinates = { x: -44, y: 18, z: 0 }

  radius = 2

}

export const castleStockLocator = new CastleStockLocator()