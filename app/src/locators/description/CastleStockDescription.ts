import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { DropAreaDescription } from '@gamepark/react-game'

export class CastleStockDescription extends DropAreaDescription {
  location = castleStockLocation
  width = 9
  ratio = 1
  borderRadius = this.width / 2
  coordinates = { x: -59, y: 18, z: 0 }
}

export const castleStockLocation = { type: LocationType.CastleStock }