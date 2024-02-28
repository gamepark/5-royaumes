/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'
import { playerThroneLocator } from '../PlayerThroneLocator'
import { EndGameCardScoring } from './EndGameCardScoring'

export class PlayerThroneRoomDescription extends LocationDescription {
  width = 6.35
  height = 8.89

  alwaysVisible = true

  getExtraCss(location: Location, context: LocationContext): Interpolation<Theme> {
    const extraCss = this.extraCss
    const { rules } = context

    const isEnd = !rules.game.rule?.id
    const isMyTurn = (context.player && rules.game.rule?.player === context.player)
    if (isEnd) return [extraCss, noPointerEvent]
    if (!isMyTurn) return extraCss

    const isSorcerer = rules.game.rule?.id === RuleId.Sorcerer && rules.game.rule?.player === location.player
    const isRecruit = rules.game.rule?.id === RuleId.Recruit && rules.game.rule?.player === location.player
    if ((isRecruit || (isSorcerer && rules.material(MaterialType.CharacterCard).selected().length))) return [extraCss, noPointerEvent]

    return extraCss
  }


  extraCss = css`
    border-radius: 0.5em;
    border: 0.05em dashed white;
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
    const { rules } = context
    const isEnd = !rules.game.rule?.id
    const isMyTurn = (context.player && rules.game.rule?.player === context.player)
    if (!isMyTurn) return position
    if (isEnd) position.z += 10

    const isSorcerer = rules.game.rule?.id === RuleId.Sorcerer && rules.game.rule?.player === location.player
    const isRecruit = rules.game.rule?.id === RuleId.Recruit && rules.game.rule?.player === location.player
    if ((isRecruit || (isSorcerer && rules.material(MaterialType.CharacterCard).selected().length))) position.z += 10

    return position
  }

  content = EndGameCardScoring

  getLocationPosition(location: Location, context: MaterialContext): Coordinates {
    const playerId = location.player!
    const baseCoordinates = playerThroneLocator.getThronePosition(playerId, context)
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

  canShortClick(move: MaterialMove, location: Location, context: MaterialContext): any {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return false
    const { rules } = context
    const item = rules.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    if (item.location.type === LocationType.Discard && move.location.type === location.type && move.location.x === location.x && move.location.player === location.player) return true

    return super.canShortClick(move, location, context)
  }
}

const noPointerEvent = css`
  pointer-events: none
`