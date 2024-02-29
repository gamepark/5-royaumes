/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { PlayerPanel, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { FC } from 'react'

export const PlayerPanels: FC<any> = () => {
  const playerId = usePlayerId()
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<FiveKingdomsRules>()!
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

export const playerColorCode: Partial<Record<Kingdom, string>> = {
  [Kingdom.Reptile]: '#B51F20',
  [Kingdom.Feline]: '#B68A11',
  [Kingdom.Raptor]: '#6D3286',
  [Kingdom.Ursid]: '#3D5C37',
  [Kingdom.Sailor]: '#014C78'
}