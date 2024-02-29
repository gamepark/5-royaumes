import { isEnumValue } from '@gamepark/rules-api'

export enum Castle {
  One = 1,
  Three,
}

export const kingdoms = Object.values(Castle).filter(isEnumValue)