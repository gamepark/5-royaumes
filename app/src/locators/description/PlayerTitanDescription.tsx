/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import TitanIcon from '../../images/icons/titan.png'
import { PlayerTitanHelp } from '../help/PlayerTitanHelp'
import { EndGameCardScoring } from './EndGameCardScoring'

export class PlayerTitanDescription extends DropAreaDescription {
  width = 6.35 + 0.4
  height = 21
  borderRadius = 0.7

  extraCss = css`
    background: no-repeat center 18em / 35% url(${TitanIcon}), linear-gradient(0deg, #ffffff70 0%, #ffffff00 70%);
  `

  help = PlayerTitanHelp

  canLongClick(): boolean {
    return false
  }


  content = EndGameCardScoring

  isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext): any {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return super.isMoveToLocation(move, location, context)
    const { rules } = context
    const item = rules.material(MaterialType.CharacterCard).getItem(move.itemIndex)
    if (item?.location.type === LocationType.Discard && !item.selected) return false
    return super.isMoveToLocation(move, location, context)
  }

}