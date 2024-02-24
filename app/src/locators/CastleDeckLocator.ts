/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'

export class CastleDeckLocator extends DeckLocator {

  delta = { x: -0.05, y: -0.05}

  coordinates = { x: -44, y: 18, z: 0 }

}

export const castleDeckLocator = new CastleDeckLocator()