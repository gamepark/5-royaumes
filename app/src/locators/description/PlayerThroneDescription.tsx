/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationDescription } from '@gamepark/react-game'

export class PlayerThroneDescription extends LocationDescription {
  width = 6.35
  height = 8.89
  extraCss = css`
    pointer-events: none;
  `
}