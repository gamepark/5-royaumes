/** @jsxImportSource @emotion/react */
import { DropAreaDescription } from '@gamepark/react-game'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'

export class PlayerHandDescription extends DropAreaDescription {
  width = characterCardDescription.width * 4
  height = characterCardDescription.height + 2
  borderRadius = characterCardDescription.borderRadius
}