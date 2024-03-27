/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
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
      <div css={[alignIcon, centerCss]}>
        <Trans defaults="header.warrior.you">
          <CastleIcon />
        </Trans>
      </div>
    )
  }

  return (
    <div css={[alignIcon, centerCss]}>
      <Trans defaults="header.warrior.player" values={{ player: name }}>
        <CastleIcon />
      </Trans>
    </div>
  )
}

export const alignIcon = css`
  display: flex;
  //gap: 4px;
  align-items: start;
  justify-content: start;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }
`

const CastleIcon: FC = () => {
  return (
    <div css={containerCss}>
      <div css={castleCss}/>
    </div>
  )
}

const centerCss = css`
  justify-content: center;
`

const containerCss = css`
  margin-top: 0.05em;
  margin-left: 0.2em;
  margin-right: 0.2em;
  border-radius: 5em; 
  display: flex;
`

const castleCss = css`
  margin-top: 0.1em;
  height: 1em;
  width: 1em;
  background: url(${Castle1});
  border-radius: 5em;
  background-size: contain;
  background-position: center;
`