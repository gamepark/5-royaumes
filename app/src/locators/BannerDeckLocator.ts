/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { characterCardDescription } from '../material/descriptions/CharacterCardDescription'
import { BannerDeckDescription } from './description/BannerDeckDescription'

export class BannerDeckLocator extends DeckLocator {

  locationDescription = new BannerDeckDescription(characterCardDescription)

  gap = { x: -0.03, y: -0.04}

  coordinates = { x: -36, y: 18, z: 0 }

  location = { type: LocationType.BannerDeck }

  getAreaCoordinates(_location: Location, context: MaterialContext): Partial<Coordinates> {
    const { rules } = context
    const deckSize = Math.min(rules.material(MaterialType.CharacterCard).location(LocationType.BannerDeck).length, 20)
    return {
      x: -36 + (-0.03 * (deckSize - 1)),
      y: 18 + (-0.04 * (deckSize - 1)),
      z: 50
    }
  }

  getCoordinates(_location: Location) {
    return this.coordinates
  }

}

export const bannerDeckLocator = new BannerDeckLocator()