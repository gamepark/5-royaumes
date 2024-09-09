/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { DropAreaDescription, isLocationSubset, LocationContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { CouncilHelp } from '../help/CouncilHelp'
import { EndGameCardScoring } from './EndGameCardScoring'

export class CouncilDescription extends DropAreaDescription {
  help = CouncilHelp

  getExtraCss(location: Location, context: LocationContext): Interpolation<Theme> {
    const extraCss = this.extraCss
    const { rules } = context

    const hasCardOnLocation = rules.material(MaterialType.CharacterCard).location((l) => isLocationSubset(location, l)).length > 0
    if (hasCardOnLocation) return [noPointerEvent]
    return extraCss
  }

  extraCss = css`
    border: 0.05em solid white;
  `

  content = EndGameCardScoring

  canLongClick(): boolean {
    return false
  }
}

const noPointerEvent = css`
  pointer-events: none
`