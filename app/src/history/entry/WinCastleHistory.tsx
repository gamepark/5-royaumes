import { HistoryEntry, usePlayerName, MoveComponentContext } from '@gamepark/react-game'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { CreateItem, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ThroneColors } from '../../style/style'

type WinCastleHistoryProps = {
  move: CreateItem
  context: MoveComponentContext<MaterialMove, Kingdom>
}

export const WinCastleHistory: FC<WinCastleHistoryProps> = (props) => {
  const { move } = props
  const playerId = move.item.location.player! as Kingdom
  const name = usePlayerName(playerId)
  const quantity = move.item.quantity ?? 1
  return (
    <HistoryEntry depth={1} backgroundColor={ThroneColors[playerId]}>
      <Trans i18nKey="history.castle" values={{ player: name, number: quantity}} />
    </HistoryEntry>
  )
}