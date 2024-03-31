/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { HistoryEntry, HistoryEntryContext } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

type RefillAlkaneHistoryProps = {
  context: HistoryEntryContext
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