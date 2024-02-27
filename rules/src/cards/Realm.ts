
import { isEnumValue } from '@gamepark/rules-api'

export enum Realm {
  Reptile = 1,
  Feline,
  BirdOfPrey,
  Ursid,
  Marine,
  ImperialOrder,
  ReligiousOrder
}

export const realms = Object.values(Realm).filter(isEnumValue)

export const baseRealms = realms.filter((r) => r <= Realm.Marine)