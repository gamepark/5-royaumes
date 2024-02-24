/** @jsxImportSource @emotion/react */
import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Castle1 from '../../images/castle/castle_1.jpg'
import Castle3 from '../../images/castle/castle_3.jpg'

export class CastleCardDescription extends CardDescription {
  borderRadius = 0.5

  backImage = Castle3
  image = Castle1

  isFlipped(item: Partial<MaterialItem>): boolean {
    return !!item.location?.rotation
  }
}

export const castleCardDescription = new CastleCardDescription()