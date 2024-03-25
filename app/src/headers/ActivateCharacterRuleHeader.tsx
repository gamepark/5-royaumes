/** @jsxImportSource @emotion/react */
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const ActivateCharacterRuleHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<FiveKingdomsRules>()!
  const playerId = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const itsMe = activePlayer === playerId
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <>{t('header.activate.you')}</>
  }

  return <>{t('header.activate.player', { player: name })}</>
}
