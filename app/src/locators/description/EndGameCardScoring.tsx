/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FiveRealmsRules } from '@gamepark/5-royaumes/FiveRealmsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { ThroneRule } from '@gamepark/5-royaumes/rules/card-effect/ThroneRule'
import { MaterialComponent, usePlayerId, useRules } from '@gamepark/react-game'
import { isLocationSubset } from '@gamepark/react-game/dist/components/material/utils'
import { Location } from '@gamepark/rules-api'
import { FC } from 'react'

type EndGameCardScoringProps = {
  location: Location
}

export const EndGameCardScoring: FC<EndGameCardScoringProps> = (props) => {
  const { location } = props
  const rules = useRules<FiveRealmsRules>()!
  if (rules.game.rule?.id) return null
  const cards = rules.material(MaterialType.CharacterCard).location((l) => isLocationSubset(l, location))
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

type CardScoringProps = { index: number, rules: FiveRealmsRules } & EndGameCardScoringProps

export const CardScoring: FC<CardScoringProps> = (props) => {
  const { index, rules } = props
  const playerId = usePlayerId()
  const card = rules.material(MaterialType.CharacterCard).index(index)
  const item = card.getItem()!
  if (!item.location.player) return null
  const itsFirst = item.location.player === (playerId ?? rules.players[0])
  const effect = new ThroneRule(rules.game, item.location.player!).getEffectRule(rules.game, card)
  if (!effect || effect.getScore() === undefined) return null
  return (
    <div css={item.location.type === LocationType.PlayerTitan? titanScoreStyle(itsFirst, item.location.x!): charScoreStyle(itsFirst)}>
      <MaterialComponent css={materialStyle} type={MaterialType.Castle}/>
      <div css={scoreValueStyle}> x {effect?.getScore()}</div>
    </div>
  )
}

const scoreStyle = css`
  background: white;
  border-radius: 5em;
  height: 2em;
  display: flex;
  width: 4em;
  align-items: center;
  padding-left: 0.25em;
  padding-right: 0.4em;
  position: absolute;
  margin-left: 1.1em;
  border: 0.05em solid black;
  box-shadow: 0 0 0.1em black, 0 0 0.1em black;
  transform: translateZ(10em);
  pointer-events: none;
`

const charScoreStyle = (itsFirst: boolean) => css`
  ${scoreStyle};
  ${itsFirst? `bottom: 2em;`: ''}
  ${!itsFirst? `top: 2em;`: ''}
`

const titanScoreStyle = (_itsFirst: boolean, x: number) => css`
  ${scoreStyle};
  bottom: ${1.5 + (x * 3)}em;
`

const scoreValueStyle = css`
  font-size: 1em;
  color: black;
  flex: 1;
  text-align: right;
`

const materialStyle = css`
  font-size: 0.5em;

`