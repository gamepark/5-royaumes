/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialMove, MaterialRules } from '@gamepark/rules-api'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'
import { playerThroneLocator } from '../PlayerThroneLocator'
import { EndGameCardScoring } from './EndGameCardScoring'

export class PlayerThroneRoomDescription extends LocationDescription {
  width = 6.35
  height = 8.89
  borderRadius = 0.5

  alwaysVisible = true

  getExtraCss(location: Location, context: LocationContext): Interpolation<Theme> {
    const extraCss = this.extraCss
    const { rules, player } = context

    const isMyTurn = this.isMyLocation(rules, location, player)
    if (!isMyTurn) return extraCss

    const isSorcerer = rules.game.rule?.id === RuleId.Sorcerer
    const isRecruit = rules.game.rule?.id === RuleId.Recruit
    if ((isRecruit || (isSorcerer && rules.material(MaterialType.CharacterCard).selected().length))) return [extraCss, noPointerEvent]

    return extraCss
  }


  extraCss = css`
    border: 0.05em solid white;
  `

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => {
      return Array.from(Array(4))
        .map((_, x) => ({
          type: LocationType.PlayerThroneRoom,
          player,
          x
        }))
    })
  }

  getCoordinates(location: Location, context: LocationContext): Coordinates | undefined {
    const position = this.getLocationPosition(location, context)
    const { rules, player } = context
    const isMyTurn = this.isMyLocation(rules, location, player)
    if (!isMyTurn) return position

    const isSorcerer = rules.game.rule?.id === RuleId.Sorcerer
    const isRecruit = rules.game.rule?.id === RuleId.Recruit
    if ((isRecruit || (isSorcerer && rules.material(MaterialType.CharacterCard).selected().length))) position.z += 10

    return position
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

    baseCoordinates.z = 0
    return baseCoordinates
  }

  isMyLocation(rules: MaterialRules, location: Location, player?: Kingdom) {
    return rules.game.rule?.player === location.player && location.player === player
  }

  canShortClick(move: MaterialMove, location: Location, context: MaterialContext): any {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return false
    const { rules, player } = context
    const item = rules.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    if (!this.isMyLocation(rules, location, player)) return super.canShortClick(move, location, context)
    if (item.location.type === LocationType.Discard && move.location.type === location.type && move.location.x === location.x && move.location.player === location.player) return true

    return super.canShortClick(move, location, context)
  }
}

const noPointerEvent = css`
  pointer-events: none
`