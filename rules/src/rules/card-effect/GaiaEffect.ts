import { MaterialMove } from '@gamepark/rules-api'
import { isTitan } from '../../cards/CardType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { TitanEffect } from './TitanEffect'

export class GaiaEffect extends TitanEffect {

  getScore(): number | undefined {
    const opponent = this.game.players.find((p) => p !== this.player)!
    const titans = this
      .material(MaterialType.CharacterCard)
      .location(LocationType.PlayerTitan)
      .player(this.player)
      .filter((item) => isTitan(item.id.front))

    const opponentTitans = this
      .material(MaterialType.CharacterCard)
      .location(LocationType.PlayerTitan)
      .player(opponent)
      .filter((item) => isTitan(item.id.front))

    if (titans.length > opponentTitans.length) {
      return 1
    }

    return 0
  }

  onGameEnd(): MaterialMove[] {
    const score = this.getScore()

    if (score) {
      return [
        this
          .material(MaterialType.Castle)
          .player(this.player)
          .createItem({
            location: {
              type: LocationType.PlayerCastle,
              player: this.player
            },
            quantity: score
          })
      ]
    }

    return []
  }
}