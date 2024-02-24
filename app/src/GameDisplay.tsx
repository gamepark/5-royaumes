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
      xMax={55}
      yMin={-30}
      yMax={24}
      margin={{ top: 7, left: 0, right: 9, bottom: 0 }}
      css={css`background: rgba(255, 255, 255, 0.2)`}
    >
      <GameTableNavigation css={css`flex-direction: column; left: auto; right: 3em; top: 28em`}/>
    </GameTable>
    <PlayerPanels/>
  </>
}
