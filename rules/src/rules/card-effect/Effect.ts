import { Material, MaterialGame, MaterialMove, MaterialRulesPart, MoveItem } from '@gamepark/rules-api'
import { Realm } from '../../cards/Realm'

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

  onGameEnd(): MaterialMove[] {
    return []
  }

  getScore(): number | undefined {
    return
  }
}