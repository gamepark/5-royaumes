/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { baseKingdoms, Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, isStartRule, Location, MaterialMove, MaterialRules } from '@gamepark/rules-api'
import { playerColorCode } from '../../panels/PlayerPanels'
import ReptileIcon from '../../images/icons/reptile.png'
import FelineIcon from '../../images/icons/feline.png'
import RaptorIcon from '../../images/icons/raptor.png'
import UrsidIcon from '../../images/icons/ursids.png'
import SailorIcon from '../../images/icons/sailor.png'
import { InfluenceZoneHelp } from '../help/InfluenceZoneHelp'

export class InfluenceZoneDescription extends LocationDescription {
  width = 6.35 + 0.4
  height = 2 * 8.89
  borderRadius = 0.7

  alwaysVisible = true

  getExtraCss(location: Location) {
    const kingdom = location.id
    return css`
      background: ${playerColorCode[kingdom]};
      background: no-repeat center 1em / 30% url(${this.icons[location.id]}), linear-gradient(180deg, ${playerColorCode[kingdom]}70 0%, ${playerColorCode[kingdom]}00 100%);
    `
  }

  help = InfluenceZoneHelp

  icons = {
    [Kingdom.Reptile]: ReptileIcon,
    [Kingdom.Feline]: FelineIcon,
    [Kingdom.Raptor]: RaptorIcon,
    [Kingdom.Ursid]: UrsidIcon,
    [Kingdom.Sailor]: SailorIcon,
  }

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => {
      return baseKingdoms
        .map(id => ({
          type: LocationType.PlayerInfluenceZone,
          player,
          id: id
        }))
    })
  }

  canShortClick(move: MaterialMove, location: Location, context: MaterialContext): boolean {
    if (isStartRule(move) && move.id === RuleId.Influence) {
      const handColor = context.rules.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(location.player).getItem()?.id?.back
      return location.player === context.player && location.id === handColor
    }

    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return false

    return super.canShortClick(move, location, context)
  }

  canLongClick(move: MaterialMove, location: Location, context: MaterialContext): boolean {
    return this.canShortClick(move, location, context)
  }

  getCoordinates(location: Location, context: LocationContext): Coordinates | undefined {
    const position = this.getInfluenceZonePosition(location, context)
    const { rules, player } = context
    if (rules.game.rule?.id === RuleId.Sorcerer && this.isMyLocation(rules, location, player) && rules.material(MaterialType.CharacterCard).selected().length) position.z += 10
    if (rules.game.rule?.id === RuleId.ChooseAction) {
      const handColor = context.rules.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(location.player).getItem()?.id?.back
      if (location.player === context.player && location.id === handColor) position.z += 10
    }


    return position
  }

  getInfluenceZonePosition(location: Location, { rules, player }: MaterialContext) {
    const xIndex = location.id - 1
    if (location.player === (player ?? rules.players[0])) {
      return {
        x: 13 + (xIndex * (this.width + 0.4)),
        y: 13.4,
        z: 0 }
    }

    return {
      x: 13 - (xIndex * (this.width + 0.4)),
      y: -19.4,
      z: 0 }
  }

  getRotateZ(location: Location, { rules, player }: LocationContext): number {
    return location.player === (player ?? rules.players[0])? 0: 180
  }

  isMyLocation(rules: MaterialRules, location: Location, player?: Kingdom) {
    return rules.game.rule?.player === location.player && location.player === player
  }

  hasImperialOrderInHand(rules: MaterialRules, player?: Kingdom) {
    if (!player) return false
    return rules.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(player).filter((item) => item.id.back === Kingdom.ImperialOrder).length > 0
  }
}