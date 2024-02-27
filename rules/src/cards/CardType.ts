import { Card, isImperialOrder, isReligiousOrder } from './Card'

export const isKing = (card: Card) => !isImperialOrder(card) && !isReligiousOrder(card) && card % 10 === 1
export const isQueen = (card: Card) => !isImperialOrder(card) && !isReligiousOrder(card) && card % 10 === 2
export const isSorcerer = (card: Card) => !isImperialOrder(card) && !isReligiousOrder(card) && card % 10 === 3
export const isRealmWarrior = (card: Card) => (!isImperialOrder(card) && !isReligiousOrder(card) && card % 10 === 4)
export const isRealmTitan = (card: Card) => (!isImperialOrder(card) && !isReligiousOrder(card) && card % 10 === 5)
export const isTitan = (card: Card) => isRealmTitan(card) || card === Card.Gaia || card === Card.Ouranos

export const isWarrior = (card: Card) => isRealmWarrior(card) || card === Card.WarriorMonk