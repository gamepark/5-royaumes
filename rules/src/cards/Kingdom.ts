
import { isEnumValue } from '@gamepark/rules-api'

export enum Kingdom {
  Reptile = 1,
  Feline,
  Raptor,
  Ursid,
  Sailor,
  ImperialOrder,
  ReligiousOrder
}

export const kingdoms = Object.values(Kingdom).filter(isEnumValue)

export const baseKingdoms = kingdoms.filter((r) => r <= Kingdom.Sailor)