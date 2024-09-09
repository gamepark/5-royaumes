/** @jsxImportSource @emotion/react */
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { HistoryEntry, HistoryEntryContext, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { getCardName } from '../../material/help/CharacterCardHelp'
import { ThroneColors } from '../../style/style'

const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

type DestroyCardHistoryProps = {
  move: MoveItem
  context: HistoryEntryContext
}

export const DestroyCardHistory: FC<DestroyCardHistoryProps> = (props) => {
  const { move, context } = props
  const { game, action } = context
  const { playerId } = action
  const { t } = useTranslation()
  const name = usePlayerName(playerId)
  const opponent = usePlayerName(game.players.find((p: Kingdom) => p !== playerId))
  const itemId = game.items[move.itemType]![move.itemIndex].id
  const front = itemId.front
  const back = itemId.back
  return (
    <HistoryEntry depth={1} backgroundColor={ThroneColors[playerId]}>
      <Trans defaults="history.destroy" values={{ player: name, opponent: opponent, card: getCardName(front, back, t)}}>
        <PlayMoveButton move={displayMaterialHelp(MaterialType.CharacterCard, { id: itemId })} local />
      </Trans>
    </HistoryEntry>
  )
}