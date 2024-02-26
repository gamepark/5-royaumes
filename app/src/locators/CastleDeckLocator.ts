/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'

export class CastleDeckLocator extends PileLocator {

  delta = { x: -0.05, y: -0.05}

  coordinates = { x: -44, y: 18, z: 0 }

  radius = 2

}

export const castleDeckLocator = new CastleDeckLocator()