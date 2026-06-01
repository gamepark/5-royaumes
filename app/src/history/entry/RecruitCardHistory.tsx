import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { HistoryEntry, PlayMoveButton, usePlayerName, MoveComponentContext } from '@gamepark/react-game'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { MaterialMoveBuilder, MoveItem, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { getCardName } from '../../material/help/CharacterCardHelp'
import { ThroneColors } from '../../style/style'
import { CardId } from '@gamepark/5-royaumes/cards/Card'

const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

type RecruitCardHistoryProps = {
  move: MoveItem
  context: MoveComponentContext<MaterialMove, Kingdom>
}

export const RecruitCardHistory: FC<RecruitCardHistoryProps> = (props) => {
  const { move, context } = props
  const { game, action } = context
  const { playerId } = action
  const { t } = useTranslation()
  const name = usePlayerName(playerId)
  const back = (game.items[move.itemType]![move.itemIndex].id as CardId).back
  const itemId = (move.reveal?.id as CardId)?.front ?? (game.items[move.itemType]![move.itemIndex].id as CardId).front
  return (
    <HistoryEntry depth={game.rule?.id === RuleId.Recruit? 0: 1} player={game.rule?.id === RuleId.Recruit? playerId: undefined} backgroundColor={ThroneColors[playerId]}>
      <Trans i18nKey="history.recruit" values={{ player: name, card: getCardName(itemId!, back!, t)}}>
        <PlayMoveButton move={displayMaterialHelp(MaterialType.CharacterCard, { id: { front: itemId, back: back } })} local />
      </Trans>
    </HistoryEntry>
  )
}