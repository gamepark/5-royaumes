import { isEnumValue } from '@gamepark/rules-api'

export enum Card {
  Reptile1 = 1,
  Reptile2,
  Reptile3,
  Reptile4,
  Reptile5,

  Feline1 = 10,
  Feline2,
  Feline3,
  Feline4,
  Feline5,

  BirdOfPrey1 = 20,
  BirdOfPrey2,
  BirdOfPrey3,
  BirdOfPrey4,
  BirdOfPrey5,

  Ursid1 = 30,
  Ursid2,
  Ursid3,
  Ursid4,
  Ursid5,

  Marine1 = 40,
  Marine2,
  Marine3,
  Marine4,
  Marine5,

  ImperialOrder1 = 50,
  ImperialOrder2,
  ImperialOrder3,
  ImperialOrder4,
  
  ReligiousOrder1 = 60,
  ReligiousOrder2,
  ReligiousOrder3,
  ReligiousOrder4,
}


export const cards = Object.values(Card).filter<Card>(isEnumValue)

export const isReptile = (card: Card) => card < Card.Feline1
export const reptiles = cards.filter(isReptile)

export const isFeline = (card: Card) => card > Card.Reptile5 && card < Card.BirdOfPrey1

export const felines = cards.filter(isFeline)

export const isBirdOfPrey = (card: Card) => card > Card.Feline5 && card < Card.Ursid1

export const birdsOfPrey = cards.filter(isBirdOfPrey)

export const isUrsid = (card: Card) => card > Card.BirdOfPrey5 && card < Card.Marine1

export const ursids = cards.filter(isUrsid)

export const isMarine = (card: Card) => card > Card.Ursid5 && card < Card.ImperialOrder1

export const marines = cards.filter(isMarine)

export const isImperialOrder = (card: Card) => card > Card.Marine5 && card < Card.ReligiousOrder1

export const imperialOrder = cards.filter(isImperialOrder)

export const isReligiousOrder = (card: Card) => card > Card.ImperialOrder4

export const religiousOrder = cards.filter(isReligiousOrder)

export const banners = cards.filter((c) => isReptile(c) || isFeline(c) || isBirdOfPrey(c) || isUrsid(c) || isMarine(c))