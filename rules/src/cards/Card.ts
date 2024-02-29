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

  Raptor1 = 21,
  Raptor2,
  Raptor3,
  Raptor4,
  Raptor5,

  Ursid1 = 31,
  Ursid2,
  Ursid3,
  Ursid4,
  Ursid5,

  Sailor1 = 41,
  Sailor2,
  Sailor3,
  Sailor4,
  Sailor5,

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

export const isFeline = (card: Card) => card > Card.Reptile5 && card < Card.Raptor1

export const felines = gameCards.filter(isFeline)

export const isRaptor = (card: Card) => card > Card.Feline5 && card < Card.Ursid1

export const raptors = gameCards.filter(isRaptor)

export const isUrsid = (card: Card) => card > Card.Raptor5 && card < Card.Sailor1

export const ursids = gameCards.filter(isUrsid)

export const isSailor = (card: Card) => card > Card.Ursid5 && card < Card.Marshall

export const sailors = gameCards.filter(isSailor)

export const isImperialOrder = (card: Card) => card > Card.Sailor5 && card < Card.Gaia

export const imperialOrder = gameCards.filter(isImperialOrder)

export const isReligiousOrder = (card: Card) => card > Card.General

export const religiousOrder = gameCards.filter(isReligiousOrder)