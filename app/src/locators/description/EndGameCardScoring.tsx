/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { ThroneRule } from '@gamepark/5-royaumes/rules/card-effect/ThroneRule'
import { isLocationSubset, Picture, usePlayerId, useRules } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { FC } from 'react'
import Castle from '../../images/castle/castle_token.jpg'

type EndGameCardScoringProps = {
  location: Location
}

export const EndGameCardScoring: FC<EndGameCardScoringProps> = (props) => {
  const { location } = props
  const rules = useRules<FiveKingdomsRules>()!
  if (rules.game.rule?.id) return null
  const cards = rules.material(location.type === LocationType.PlayerThrone ? MaterialType.ThroneCard : MaterialType.CharacterCard).location((l) => isLocationSubset(l, location))
  return (
    <>
      {
        cards.getIndexes().map((index) => (
          <CardScoring key={index} index={index} rules={rules} location={location}/>
        ))
      }
    </>
  )
}

type CardScoringProps = { index: number, rules: FiveKingdomsRules } & EndGameCardScoringProps

export const CardScoring: FC<CardScoringProps> = (props) => {
  const { index, rules } = props
  const playerId = usePlayerId()
  const card = rules.material(MaterialType.CharacterCard).index(index)
  const item = card.getItem()!
  if (!item.location.player) return null
  const itsFirst = item.location.player === (playerId ?? rules.players[0])
  const effect = new ThroneRule(rules.game, item.location.player!).getEffectRule(rules.game, card)
  if (!effect || effect.score === undefined) return null
  return (
    <span css={[data, counter, item.location.type === LocationType.PlayerTitan ? titanScoreStyle(itsFirst, item.location.x!) : charScoreStyle(itsFirst)]}>
      <span css={shine} />
      <span css={contentCss}>
        <Picture css={mini} src={Castle}/>
        <span>{effect?.score}</span>
      </span>
    </span>
  )
}

const charScoreStyle = (itsFirst: boolean) => css`
  left: 1em;
  ${itsFirst ? `bottom: 2em;` : ''}
  ${!itsFirst ? `top: 2em;` : ''}
`

const titanScoreStyle = (_itsFirst: boolean, x: number) => css`
  left: 1.15em;
  bottom: ${1.5 + (x * 3)}em;
`

const mini = css`
  height: 1.05em; 
  margin-bottom: -0.17em;
  border: 0.03em solid black;
  border-radius: 5em;
`

const counter = css`
  display: flex;
  position: absolute;
  overflow: hidden;
  width: 4.5em;
  bottom: 0.2em;
  left: 1.15em;
  align-items: center;
  padding: 1em 0.5em;
  height: 2.3em;
  border: 0.2em solid gold;
  transform: translateZ(10em);
  box-shadow: 0 0 0.5em black,0 0 0.5em black;
`

const shine = css`
  &:after {
    content: '';
    position: absolute;
    left: -100%;
    right: -100%;
    top: -100%;
    bottom: -100%;
    z-index: 1;
    transform-style: preserve-3d;
    background: linear-gradient(to bottom right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 34%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0) 66%,
    rgba(255, 255, 255, 0) 100%);
  }
`

const data = css`
  color: black;
  background-color: gray;
  padding: 0.1em 0.3em;
  border-radius: 0.4em;
  z-index: 2;
`

const contentCss = css`
  width: 100%;
  font-size: 1.5em;
  display: flex;
  justify-content: space-between;
  transform: translateZ(10em);
  z-index: 1;
`