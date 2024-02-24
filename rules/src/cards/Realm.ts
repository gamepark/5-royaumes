import { isEnumValue } from '@gamepark/rules-api'

export enum Realm {
  Reptile = 1,
  Feline,
  BirdOfPrey,
  Ursid,
  Marine
}

export const realms = Object.values(Realm).filter(isEnumValue)