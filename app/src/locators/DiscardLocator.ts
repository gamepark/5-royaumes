/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'
import { DiscardDescription } from './description/DiscardDescription'

export class DiscardLocator extends DeckLocator {

  locationDescription = new DiscardDescription()

  delta = { x: -0.03, y: -0.04}

  coordinates = { ...this.locationDescription.coordinates, z: 0.05}

}

export const discardLocator = new DiscardLocator()