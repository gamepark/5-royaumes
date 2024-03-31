/** @jsxImportSource @emotion/react */
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { HistoryEntry, HistoryEntryContext, usePlayerName } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ThroneColors } from '../../style/style'

type StealCastleHistoryProps = {
  move: MoveItem
  context: HistoryEntryContext
}

export const StealCastleHistory: FC<StealCastleHistoryProps> = (props) => {
  const { move, context } = props
  const { game, action } = context
  const { playerId } = action
  const name = usePlayerName(playerId)
  const opponent = usePlayerName(game.players.find((p: Kingdom) => p !== playerId))
  const quantity = move.quantity ?? 1
  return (
    <HistoryEntry depth={1} backgroundColor={ThroneColors[playerId]}>
      <Trans defaults="history.castle.steal" values={{ player: name, opponent: opponent, number: quantity}} />
    </HistoryEntry>
  )
}