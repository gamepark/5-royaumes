/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Realm } from '@gamepark/5-royaumes/cards/Realm'
import { PlayerId } from '@gamepark/5-royaumes/FiveRealmsOptions'
import { FiveRealmsRules } from '@gamepark/5-royaumes/FiveRealmsRules'
import { PlayerPanel, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { FC } from 'react'

export const PlayerPanels: FC<any> = () => {
  const playerId = usePlayerId()
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<FiveRealmsRules>()!
  return (
    <>
      {players.map((player) =>
        <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={[panelPosition, player.id === (playerId ?? rules.players[0])? bottomPosition: topPosition ]}/>
      )}
    </>
  )
}
const panelPosition = css`
  position: absolute;
  right: 1em;
  width: 28em;
  height: 14em;
`

const topPosition = css`
  top: 8.5em;
`

const bottomPosition = css`
  top: 85em;
`

export const playerColorCode: Record<PlayerId, string> = {
  [Realm.Reptile]: 'red',
  [Realm.Feline]: 'yellow',
  [Realm.BirdOfPrey]: 'purple',
  [Realm.Ursid]: 'green',
  [Realm.Marine]: 'blue'
}