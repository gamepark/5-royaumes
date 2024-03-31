/** @jsxImportSource @emotion/react */
import { HistoryEntry, HistoryEntryContext, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ThroneColors } from '../../style/style'

type PlaceBannerCardHistoryProps = {
  move: MoveItem
  context: HistoryEntryContext
}

export const PlaceBannerCardHistory: FC<PlaceBannerCardHistoryProps> = (props) => {
  const { move, context } = props
  const { game, action } = context
  const { playerId } = action
  const { t } = useTranslation()
  const name = usePlayerName(playerId)
  const back = game.items[move.itemType]![move.itemIndex].id.back
  return (
    <HistoryEntry borderTop player={playerId} backgroundColor={ThroneColors[playerId]}>
      {t('history.place', { player: name, banner: t(`kingdom.${back}`)})}
    </HistoryEntry>
  )
}