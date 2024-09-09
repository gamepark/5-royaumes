/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { HistoryEntry, HistoryEntryContext, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { CustomMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { getCardName } from '../../material/help/CharacterCardHelp'
import { ThroneColors } from '../../style/style'

const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

type ActivateCardHistoryProps = {
  move: CustomMove
  context: HistoryEntryContext
}

export const ActivateCardHistory: FC<ActivateCardHistoryProps> = (props) => {
  const { move, context } = props
  const { game, action } = context
  const { playerId } = action
  const { t } = useTranslation()
  const name = usePlayerName(playerId)
  const itemId = game.items[MaterialType.CharacterCard]![move.data].id
  const front = itemId.front
  const back = itemId.back
  return (
    <HistoryEntry player={playerId} backgroundColor={ThroneColors[playerId]}>
      <Trans defaults="history.effect" values={{ player: name, card: getCardName(front, back, t)}}>
        <PlayMoveButton move={displayMaterialHelp(MaterialType.CharacterCard, { id: itemId })} local />
      </Trans>
    </HistoryEntry>
  )
}