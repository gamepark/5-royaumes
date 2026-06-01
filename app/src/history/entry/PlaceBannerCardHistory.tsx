import { HistoryEntry, usePlayerName, MoveComponentContext } from '@gamepark/react-game'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { MoveItem, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ThroneColors } from '../../style/style'
import { CardId } from '@gamepark/5-royaumes/cards/Card'

type PlaceBannerCardHistoryProps = {
  move: MoveItem
  context: MoveComponentContext<MaterialMove, Kingdom>
}

export const PlaceBannerCardHistory: FC<PlaceBannerCardHistoryProps> = (props) => {
  const { move, context } = props
  const { game, action } = context
  const { playerId } = action
  const { t } = useTranslation()
  const name = usePlayerName(playerId)
  const back = (game.items[move.itemType]![move.itemIndex].id as CardId).back
  return (
    <HistoryEntry borderTop player={playerId} backgroundColor={ThroneColors[playerId]}>
      {t('history.place', { player: name, banner: t(`kingdom.${back}`)})}
    </HistoryEntry>
  )
}