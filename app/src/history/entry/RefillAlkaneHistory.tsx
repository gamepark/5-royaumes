import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { HistoryEntry, MoveComponentContext } from '@gamepark/react-game'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

type RefillAlkaneHistoryProps = {
  context: MoveComponentContext<MaterialMove, Kingdom>
}

export const RefillAlkaneHistory: FC<RefillAlkaneHistoryProps> = (props) => {
  const { context } = props
  const { t } = useTranslation()
  if (!context.action.consequences.some((move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.location.type === LocationType.AlkaneSquare)) return null
  return (
    <HistoryEntry borderTop>
      <strong>{t('history.refill')}</strong>
    </HistoryEntry>
  )
}