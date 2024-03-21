/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { usePlayerId } from '@gamepark/react-game/dist/hooks/usePlayerId'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
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

export const alignIcon = css`
  > * {
    vertical-align: middle;
  }

  picture, img {
    vertical-align: middle;
    height: 1.5em;
    margin-right: 0.1em;
  }
`