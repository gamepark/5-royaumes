/** @jsxImportSource @emotion/react */
import { HistoryEntry, HistoryEntryContext, usePlayerName } from '@gamepark/react-game'
import { CreateItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ThroneColors } from '../../style/style'

type WinCastleHistoryProps = {
  move: CreateItem
  context: HistoryEntryContext
}

export const WinCastleHistory: FC<WinCastleHistoryProps> = (props) => {
  const { move } = props
  const playerId = move.item.location.player!
  const name = usePlayerName(playerId)
  const quantity = move.item.quantity ?? 1
  return (
    <HistoryEntry depth={1} backgroundColor={ThroneColors[playerId]}>
      <Trans defaults="history.castle" values={{ player: name, number: quantity}} />
    </HistoryEntry>
  )
}