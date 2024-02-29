import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { LocationDescription } from '@gamepark/react-game'

export class CastleStockDescription extends LocationDescription<Kingdom, MaterialType, LocationType> {
  location = castleStockLocation
  width = 9
  ratio = 1
  borderRadius = this.width / 2
  coordinates = { x: -59, y: 18, z: 0 }
}

export const castleStockLocation = { type: LocationType.CastleStock }