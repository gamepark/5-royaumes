import { isMoveItemType, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { isWarrior } from '../../cards/CardType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'
import { WarriorEffect } from './WarriorEffect'

export class WarriorMonkEffect extends WarriorEffect {

  onRecruit(move: MoveItem): MaterialMove[] {
    if (!isMoveItemType(MaterialType.CharacterCard)(move) || !this.canUseWarrior) return []
    return [this.rules().startRule(RuleId.Warrior)]
  }

  // Warrior monk do nothing
  onInfluence(): MaterialMove[] {
    return []
  }

  onGameEnd() {
    const opponent = this.game.players.find((p) => p !== this.player)!
    const score = this.getScore()

    if (score) {
      return [
        this
          .material(MaterialType.Castle)
          .location(LocationType.PlayerCastle)
          .player(opponent)
          .moveItem({
            type: LocationType.PlayerCastle,
            player: this.player
          }, 2)
      ]
    }

    return []
  }

  getScore(): number | undefined {
    const opponent = this.game.players.find((p) => p !== this.player)!
    const warriors = this
      .material(MaterialType.CharacterCard)
      .location(LocationType.PlayerThroneRoom)
      .player(this.player)
      .filter((item) => isWarrior(item.id.front))

    const opponentWarrior = this
      .material(MaterialType.CharacterCard)
      .location(LocationType.PlayerThroneRoom)
      .player(opponent)
      .filter((item) => isWarrior(item.id.front))

    if (warriors.length > opponentWarrior.length) {
      return this
          .material(MaterialType.Castle)
          .location(LocationType.PlayerCastle)
          .player(opponent)
          .getItem()?.quantity ?? 0
    }

    return 0
  }
}