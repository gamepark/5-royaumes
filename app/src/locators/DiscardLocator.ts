/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'

export class DiscardLocator extends DeckLocator {

  delta = { x: -0.03, y: -0.04}

  coordinates = { x: -30, y: 18, z: 0 }

}

export const discardLocator = new DiscardLocator()