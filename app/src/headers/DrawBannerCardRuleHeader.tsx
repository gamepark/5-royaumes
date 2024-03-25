/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const DrawBannerCardRuleHeader = () => {
  const playerId = usePlayerId()
  const { t } = useTranslation()
  const rules = useRules()!
  const activePlayer = rules.getActivePlayer()
  const name = usePlayerName(activePlayer)
  if (activePlayer === playerId) {
    return <>{t('header.place.you')}</>
  }
  return <>{t('header.place.player', { player: name })}</>
}
