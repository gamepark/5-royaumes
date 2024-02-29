
import { isEnumValue } from '@gamepark/rules-api'

export enum Kingdom {
  Reptile = 1,
  Feline,
  BirdOfPrey,
  Ursid,
  Marine,
  ImperialOrder,
  ReligiousOrder
}

export const kingdoms = Object.values(Kingdom).filter(isEnumValue)

export const baseKingdoms = kingdoms.filter((r) => r <= Kingdom.Marine)