import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { LocationDescription } from '@gamepark/react-game'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'
import { BannerDeckHelp } from '../help/BannerDeckHelp'

export class BannerDeckDescription extends LocationDescription<Kingdom, MaterialType, LocationType> {

  location = { type: LocationType.BannerDeck }

  width = 1
  height = 1
  borderRadius = characterCardDescription.borderRadius
  alwaysVisible = false

  help = BannerDeckHelp
}
