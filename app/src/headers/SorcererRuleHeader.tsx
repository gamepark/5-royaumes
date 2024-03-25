/** @jsxImportSource @emotion/react */
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const SorcererRuleHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<FiveKingdomsRules>()!
  const playerId = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const itsMe = activePlayer === playerId
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return (
      <>{t('header.sorceress.you')}</>
    )
  }

  return (
    <>{t('header.sorceress.player', { player: name })}</>
  )
}