import { Card, isImperialOrder, isReligiousOrder } from './Card'

export const isKing = (card: Card) => !isImperialOrder(card) && !isReligiousOrder(card) && card % 10 === 1
export const isQueen = (card: Card) => !isImperialOrder(card) && !isReligiousOrder(card) && card % 10 === 2
export const isSorcerer = (card: Card) => !isImperialOrder(card) && !isReligiousOrder(card) && card % 10 === 3
export const isKingdomWarrior = (card: Card) => (!isImperialOrder(card) && !isReligiousOrder(card) && card % 10 === 4)
export const isKingdomTitan = (card: Card) => (!isImperialOrder(card) && !isReligiousOrder(card) && card % 10 === 5)
export const isTitan = (card: Card) => isKingdomTitan(card) || card === Card.Gaia || card === Card.Ouranos

export const isWarrior = (card: Card) => isKingdomWarrior(card) || card === Card.WarriorMonk