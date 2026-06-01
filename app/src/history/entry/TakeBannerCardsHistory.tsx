import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { HistoryEntry, usePlayerName, MoveComponentContext } from '@gamepark/react-game'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { isMoveItemType, MoveItem, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ThroneColors } from '../../style/style'
import { CardId } from '@gamepark/5-royaumes/cards/Card'

type TakeBannerCardsHistoryProps = {
  move: MoveItem
  context: MoveComponentContext<MaterialMove, Kingdom>
}

export const TakeBannerCardsHistory: FC<TakeBannerCardsHistoryProps> = (props) => {
  const { move, context } = props
  const { game, action } = context
  const { playerId } = action
  const isDraw = isMoveItemType(MaterialType.CharacterCard)(action.move) && action.move.location.type === LocationType.PlayerHand
  const drawnCount =
    (isDraw? 1: 0) +
    action.consequences.filter((c) => isMoveItemType(MaterialType.CharacterCard)(c) && c.location?.type === LocationType.PlayerHand).length
  const { t } = useTranslation()
  const name = usePlayerName(playerId)
  const back = (game.items[move.itemType]![move.itemIndex].id as CardId).back
  if (!drawnCount) return null
  return (
    <HistoryEntry depth={1} backgroundColor={ThroneColors[playerId]}>
      {t('history.take', { player: name, number: drawnCount, banner: t(`kingdom.${back}`)})}
    </HistoryEntry>
  )
}