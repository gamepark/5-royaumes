import { DropAreaDescription } from '@gamepark/react-game'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'
import { DiscardHelp } from '../help/DiscardHelp'

export class DiscardDescription extends DropAreaDescription {
  width = characterCardDescription.width + 0.6
  height = characterCardDescription.height + 0.6
  borderRadius = characterCardDescription.borderRadius

  help = DiscardHelp
}
