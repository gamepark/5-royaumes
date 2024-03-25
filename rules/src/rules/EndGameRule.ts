  import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ThroneRule } from './card-effect/ThroneRule'

export class EndGameRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = []

    const throne = this
      .material(MaterialType.CharacterCard)
      .location(LocationType.Council)

    for (const player of this.game.players) {
      const throneRule = new ThroneRule(this.game, player)
      const cards = throne.player(player)
      for (const index of cards.getIndexes()) {
        const card = cards.index(index)
        const effect = throneRule.getEffectRule(this.game, card)
        if (effect) {
          moves.push(...effect.onGameEnd())
        }
      }
    }

    moves.push(this.rules().endGame())
    return moves
  }
}