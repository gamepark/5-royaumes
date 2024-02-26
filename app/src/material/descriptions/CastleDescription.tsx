/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { RoundTokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Castle1 from '../../images/castle/castle_token.jpg'

export class CastleDescription extends RoundTokenDescription {
  diameter = 3
  image = Castle1

  staticItem = { quantity: 10, location: { type: LocationType.CastlePile } }

  isFlipped(item: Partial<MaterialItem>): boolean {
    return !!item.location?.rotation
  }
}

export const castleDescription = new CastleDescription()