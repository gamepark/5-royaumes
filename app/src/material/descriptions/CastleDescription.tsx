/** @jsxImportSource @emotion/react */
import { RoundTokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Castle1 from '../../images/castle/castle_token.jpg'
import { castleStockLocation } from '../../locators/description/CastleStockDescription'

export class CastleDescription extends RoundTokenDescription {
  diameter = 3
  image = Castle1

  staticItem = { quantity: 10, location: castleStockLocation }
  stockLocation = castleStockLocation

  isFlipped(item: Partial<MaterialItem>): boolean {
    return !!item.location?.rotation
  }
}

export const castleDescription = new CastleDescription()