/** @jsxImportSource @emotion/react */
import { HistoryEntry } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

type EndGameHistoryProps = {
}

export const EndGameHistory: FC<EndGameHistoryProps> = () => {
  const { t } = useTranslation()
  return (
    <HistoryEntry borderTop>
      <strong>{t('header.end.game')}</strong>
    </HistoryEntry>
  )
}