import { Material, MaterialGame, MaterialMove, MaterialRulesPart, MoveItem } from '@gamepark/rules-api'
import { Realm } from '../../cards/Realm'
import { Memory } from '../Memory'

export class Effect extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player: Realm, readonly card: Material) {
    super(game)
  }

  onInfluence(_move: MoveItem): MaterialMove[] {
    return []
  }

  onRecruit(_move: MoveItem): MaterialMove[] {
    return []
  }

  get moves(): MaterialMove[] {
    return []
  }

  onGameEnd(): MaterialMove[] {
    return []
  }

  addActivation(): void {
    this.memorize<number[]>(Memory.ActivatedCharacters, (chars) => {
      const characters = chars ?? []
      characters.push(this.card.getIndex())
      return characters
    })
  }

  consumeActivation(): void {
    this.memorize<number[]>(Memory.ActivatedCharacters, (chars) => {
      const characters = [...chars]
      const index = chars.findIndex((index) => index === this.card.getIndex())
      characters.splice(index, 1)
      return characters
    })
    if (!this.remind<number[]>(Memory.ActivatedCharacters).length) this.forget(Memory.ActivatedCharacters)
  }

  getScore(): number | undefined {
    return
  }
}