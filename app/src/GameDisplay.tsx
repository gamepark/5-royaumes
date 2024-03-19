/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  return <>
    <GameTable
      xMin={-50}
      xMax={46}
      yMin={-30}
      yMax={24}
      margin={{ top: 7, left: 0, right: 21, bottom: 0 }}
      snapToCenter={false}
    >
      <GameTableNavigation css={css`flex-direction: column; left: auto; right: 3em; top: 28em`}/>
      <PlayerPanels/>
    </GameTable>
  </>
}
