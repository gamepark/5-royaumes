/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { isMoveItemType, isStartRule, Location, MaterialMove } from '@gamepark/rules-api'
import FelineIcon from '../../images/icons/feline.png'
import RaptorIcon from '../../images/icons/raptor.png'
import ReptileIcon from '../../images/icons/reptile.png'
import SailorIcon from '../../images/icons/sailor.png'
import UrsidIcon from '../../images/icons/ursids.png'
import { playerColorCode } from '../../panels/PlayerPanels'
import { InfluenceZoneHelp } from '../help/InfluenceZoneHelp'

export class InfluenceZoneDescription extends DropAreaDescription {
  width = 6.35 + 0.4
  height = 2 * 8.89
  borderRadius = 0.7

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
}