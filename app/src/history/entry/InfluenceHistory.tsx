/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { HistoryEntry, HistoryEntryContext, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ThroneColors } from '../../style/style'

type InfluenceHistoryProps = {
  context: HistoryEntryContext
}

export const InfluenceHistory: FC<InfluenceHistoryProps> = (props) => {
  const { context } = props
  const { action } = context
  const { playerId } = action
  const { t } = useTranslation()
  const name = usePlayerName(playerId)
  const allMoves = [context.action.move, ...context.action.consequences]
  const back = (allMoves.find((c) => isMoveItemType(MaterialType.CharacterCard)(c) && c.location?.type === LocationType.PlayerInfluenceZone) as MoveItem)?.location?.id
  let influenceCount = allMoves.filter((c) => isMoveItemType(MaterialType.CharacterCard)(c) && c.location?.type === LocationType.PlayerInfluenceZone).length
  if (!influenceCount) return null

  return (
    <HistoryEntry player={playerId} backgroundColor={ThroneColors[playerId]}>
      {t('history.influence', { player: name, number: influenceCount, kingdom: t(`kingdom.${back}`)})}
    </HistoryEntry>
  )
}