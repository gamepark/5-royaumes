/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { characterCardDescription } from '../material/descriptions/CharacterCardDescription'
import { BannerDeckDescription } from './description/BannerDeckDescription'

class BannerDeckLocator extends DeckLocator {

  location = { type: LocationType.BannerDeck }
  locationDescription = new BannerDeckDescription(characterCardDescription)

  coordinates = { x: -36, y: 18 }

  getAreaCoordinates(_location: Location, context: MaterialContext): Partial<Coordinates> {
    const { rules } = context
    const deckSize = Math.min(rules.material(MaterialType.CharacterCard).location(LocationType.BannerDeck).length, 20)
    return {
      x: -36 + (-0.03 * (deckSize - 1)),
      y: 18 + (-0.04 * (deckSize - 1)),
      z: 5
    }
  }
}

export const bannerDeckLocator = new BannerDeckLocator()