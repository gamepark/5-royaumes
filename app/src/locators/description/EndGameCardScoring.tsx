/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { ThroneRule } from '@gamepark/5-royaumes/rules/card-effect/ThroneRule'
import { Memory, ThroneActivationState } from '@gamepark/5-royaumes/rules/Memory'
import { MaterialComponent, usePlayerId, useRules } from '@gamepark/react-game'
import { isLocationSubset } from '@gamepark/react-game/dist/components/material/utils'
import { Location } from '@gamepark/rules-api'
import { FC } from 'react'

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

export const EndGameThroneScoring: FC<EndGameCardScoringProps> = (props) => {
  const { location } = props
  const playerId = usePlayerId()
  const rules = useRules<FiveKingdomsRules>()!
  const player = location.player
  const itsFirst = player === (playerId ?? rules.players[0])
  const throneState = rules.remind(Memory.ThroneActivation, location.player)
  const consumed = throneState === ThroneActivationState.CONSUMED
  if (consumed) {
    return (<div css={consumedStyle(itsFirst)}>
      <FontAwesomeIcon icon={faCheck} css={consumedIcon}/>
    </div>)
  }

  return null
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
  if (!effect || effect.getScore() === undefined) return null
  return (
    <div css={item.location.type === LocationType.PlayerTitan ? titanScoreStyle(itsFirst, item.location.x!) : charScoreStyle(itsFirst)}>
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
  ${itsFirst ? `bottom: 2em;` : ''}
  ${!itsFirst ? `top: 2em;` : ''}
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

const consumedStyle = (itsFirst: boolean) => css`
  ${scoreStyle};
  width: auto;
  padding: 0.5em;
  background: rgba(0, 128, 0, 1);
  display: flex;
  ${itsFirst ? `bottom: 1em;` : ''}
  ${!itsFirst ? `top: 1em;` : ''}
  left: 1.1em;
  align-items: center;
  justify-content: center;
`

const consumedIcon = css``