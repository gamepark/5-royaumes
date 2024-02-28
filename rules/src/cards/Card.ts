import { isEnumValue } from '@gamepark/rules-api'

export enum Card {
  Reptile1 = 1,
  Reptile2,
  Reptile3,
  Reptile4,
  Reptile5,

  Feline1 = 11,
  Feline2,
  Feline3,
  Feline4,
  Feline5,

  BirdOfPrey1 = 21,
  BirdOfPrey2,
  BirdOfPrey3,
  BirdOfPrey4,
  BirdOfPrey5,

  Ursid1 = 31,
  Ursid2,
  Ursid3,
  Ursid4,
  Ursid5,

  Marine1 = 41,
  Marine2,
  Marine3,
  Marine4,
  Marine5,

  Marshall = 50,
  Colonel,
  Captain,
  General,
  
  Gaia = 60,
  Ouranos,
  Papesse,
  WarriorMonk,
}


export const gameCards = Object.values(Card).filter<Card>(isEnumValue)

export const isReptile = (card: Card) => card < Card.Feline1
export const reptiles = gameCards.filter(isReptile)

export const isFeline = (card: Card) => card > Card.Reptile5 && card < Card.BirdOfPrey1

export const felines = gameCards.filter(isFeline)

export const isBirdOfPrey = (card: Card) => card > Card.Feline5 && card < Card.Ursid1

export const birdsOfPrey = gameCards.filter(isBirdOfPrey)

export const isUrsid = (card: Card) => card > Card.BirdOfPrey5 && card < Card.Marine1

export const ursids = gameCards.filter(isUrsid)

export const isMarine = (card: Card) => card > Card.Ursid5 && card < Card.Marshall

export const marines = gameCards.filter(isMarine)

export const isImperialOrder = (card: Card) => card > Card.Marine5 && card < Card.Gaia

export const imperialOrder = gameCards.filter(isImperialOrder)

export const isReligiousOrder = (card: Card) => card > Card.General

export const religiousOrder = gameCards.filter(isReligiousOrder)