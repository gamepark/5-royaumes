import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { DropAreaDescription, isLocationSubset, LocationContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { BannerDeckHelp } from '../help/BannerDeckHelp'

export class BannerDeckDescription extends DropAreaDescription {

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
