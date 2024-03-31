import { css } from '@emotion/react'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { isLocationSubset, LocationContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'
import { BannerDeckHelp } from '../help/BannerDeckHelp'

export class BannerDeckDescription extends LocationDescription<Kingdom, MaterialType, LocationType> {

  location = { type: LocationType.BannerDeck }

  width = characterCardDescription.width
  height = characterCardDescription.height
  borderRadius = characterCardDescription.borderRadius
  alwaysVisible = true

  getCoordinates(_location: Location, context: LocationContext) {
    const { rules } = context
    const deckSize = Math.min(rules.material(MaterialType.CharacterCard).location(LocationType.BannerDeck).length, 20)
    return {
      x: -36 + (-0.03 * (deckSize - 1)),
      y: 18 + (-0.04 * (deckSize - 1)),
      z: 50
    }
  }

  getExtraCss(location: Location, context: LocationContext) {
    const deckSize = context.rules.material(MaterialType.CharacterCard).location((l) => isLocationSubset(l, location)).length
    if (!deckSize) return []
    return [
      css`
        pointer-events: none;

        &:before {
          font-size: 4.5em;
          font-family: Arial, serif;
          color: rgb(255 255 255 / 80%);
          text-shadow: black 0 0 0.1em;
          font-weight: bold;
          margin-top: 0.12em;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          content: '${deckSize}';
        }
      `
    ]
  }

  help = BannerDeckHelp
}
