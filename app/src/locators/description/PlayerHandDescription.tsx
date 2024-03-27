/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'

export class PlayerHandDescription extends LocationDescription {
  width = characterCardDescription.width * 4
  height = characterCardDescription.height + 2
  borderRadius = characterCardDescription.borderRadius

  getLocations({ player }: MaterialContext): Location[] {
    return player ? [{ type: LocationType.PlayerHand, player }] : []
  }

  coordinates = { x: 10, y: -3, z: 0.05 }
}