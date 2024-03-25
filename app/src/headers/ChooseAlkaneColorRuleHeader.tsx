/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const ChooseAlkaneColorRuleHeader = () => {
  const playerId = usePlayerId()
  const { t } = useTranslation()
  const rules = useRules()!
  const activePlayer = rules.getActivePlayer()
  const name = usePlayerName(activePlayer)
  if (activePlayer === playerId) {
    return <>{t('header.pick.you')}</>
  }
  return <>{t('header.pick.player', { player: name })}</>
}
