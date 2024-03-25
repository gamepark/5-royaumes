/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import Castle1 from '../images/castle/castle_token.jpg'

export const WarriorRuleHeader = () => {
  const rules = useRules<FiveKingdomsRules>()!
  const playerId = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const itsMe = activePlayer === playerId
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return (
      <p css={alignIcon}>
        <Trans defaults="header.warrior.you">
          <Picture src={Castle1}/>
        </Trans>
      </p>
    )
  }

  return (
    <p css={alignIcon}>
      <Trans defaults="header.warrior.player" values={{ player: name }}>
        <Picture src={Castle1}/>
      </Trans>
    </p>
  )
}

export const alignIcon = css`
  > picture {
    vertical-align: middle;
  }

  picture, img {
    vertical-align: middle;
    height: 1.5em;
    margin-right: 0.1em;
  }
`