import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { HistoryEntry, PlayMoveButton, usePlayerName, MoveComponentContext } from '@gamepark/react-game'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { MaterialMoveBuilder, MoveItem, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { getCardName } from '../../material/help/CharacterCardHelp'
import { ThroneColors } from '../../style/style'

const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

type DiscardCardHistoryProps = {
  move: MoveItem
  context: MoveComponentContext<MaterialMove, Kingdom>
}

export const DiscardCardHistory: FC<DiscardCardHistoryProps> = (props) => {
  const { move, context } = props
  const { game, action } = context
  const { playerId } = action
  const { t } = useTranslation()
  const name = usePlayerName(playerId)
  const itemId = game.items[move.itemType]![move.itemIndex].id
  const front = itemId.front
  const back = itemId.back
  return (
    <HistoryEntry depth={1} backgroundColor={ThroneColors[playerId]}>
      <Trans i18nKey="history.discard" values={{ player: name, card: getCardName(front, back, t)}}>
        <PlayMoveButton move={displayMaterialHelp(MaterialType.CharacterCard, { id: itemId })} local />
      </Trans>
    </HistoryEntry>
  )
}