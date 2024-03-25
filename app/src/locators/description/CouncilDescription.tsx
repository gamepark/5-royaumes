/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { isLocationSubset, LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialRules } from '@gamepark/rules-api'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'
import { CouncilHelp } from '../help/CouncilHelp'
import { playerThroneLocator } from '../PlayerThroneLocator'
import { EndGameCardScoring } from './EndGameCardScoring'

export class CouncilDescription extends LocationDescription {
  width = 6.35
  height = 8.89
  borderRadius = 0.5
  alwaysVisible = true
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

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => {
      return Array.from(Array(4))
        .map((_, x) => ({
          type: LocationType.Council,
          player,
          x
        }))
    })
  }

  getCoordinates(location: Location, context: LocationContext): Coordinates | undefined {
    return this.getLocationPosition(location, context)
  }

  content = EndGameCardScoring

  getLocationPosition(location: Location, context: MaterialContext): Coordinates {
    const playerId = location.player!
    const baseCoordinates = playerThroneLocator.locationDescription.getThronePosition(playerId, context)
    switch (location.x) {
      case 1:
        baseCoordinates.x += (characterCardDescription.width + 0.4)
        break
      case 2:
        baseCoordinates.y += (characterCardDescription.height + 0.4)
        break
      case 3:
        baseCoordinates.x -= (characterCardDescription.width + 0.4)
        break
      default:
        baseCoordinates.y -= (characterCardDescription.height + 0.4)
        break
    }

    baseCoordinates.z = 5
    return baseCoordinates
  }

  isMyLocation(rules: MaterialRules, location: Location, player?: Kingdom) {
    return rules.game.rule?.player === location.player && location.player === player
  }

  canLongClick(): boolean {
    return false
  }
}

const noPointerEvent = css`
  pointer-events: none
`