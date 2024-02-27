/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FiveRealmsRules } from '@gamepark/5-royaumes/FiveRealmsRules'
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
  const { location } = props;
  const rules = useRules<FiveRealmsRules>()!
  const playerId = usePlayerId()
  if (rules.game.rule?.id) return null
  const card = rules.material(MaterialType.CharacterCard).location((l) => isLocationSubset(location, l))
  const item = card.getItem()
  if (!item || !item.location.player) return null
  const effect = new ThroneRule(rules.game, item.location.player).getEffectRule(rules.game, card)
  if (!effect || !effect.getScore()) return null
  const itsFirst = item.location.player === (playerId ?? rules.players[0])
  return (
    <div css={scoreStyle(itsFirst)}>
      <MaterialComponent css={materialStyle} type={MaterialType.Castle} />
      <div css={scoreValueStyle}> x {effect?.getScore()}</div>
    </div>
  )
}

const scoreStyle = (itsFirst: boolean) => css`
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
  bottom: ${itsFirst? 2: 'auto'}em;
  top: ${itsFirst? 'auto': 2}em;
  border: 0.05em solid black;
  box-shadow: 0 0 0.1em black, 0 0 0.1em black;
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