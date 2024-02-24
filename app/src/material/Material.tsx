import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { castleCardDescription } from './descriptions/CastleCardDescription'
import { characterCardDescription } from './descriptions/CharacterCardDescription'
import { throneCardDescription } from './descriptions/ThroneCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.ThroneCard]: throneCardDescription,
  [MaterialType.CharacterCard]: characterCardDescription,
  [MaterialType.CastleCard]: castleCardDescription
}
