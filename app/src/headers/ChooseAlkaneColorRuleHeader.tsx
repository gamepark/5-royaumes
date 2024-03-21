/** @jsxImportSource @emotion/react */
import { usePlayerId } from '@gamepark/react-game/dist/hooks/usePlayerId'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
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
