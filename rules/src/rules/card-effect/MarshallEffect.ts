import { MaterialMove } from '@gamepark/rules-api'
import { isImperialOrder } from '../../cards/Card'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Effect } from './Effect'

export class MarshallEffect extends Effect {

  onGameEnd(): MaterialMove[] {
    const score = this.score
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

  get score(): number | undefined {
    const opponent = this.game.players.find((p) => p !== this.player)!

    const cards = this
      .material(MaterialType.CharacterCard)
      .location((location) => location.type === LocationType.PlayerTitan || location.type === LocationType.PlayerThroneRoom)
      .filter((item) => isImperialOrder(item.id.front))

    const myCards = cards.player(this.player).length
    const opponentCards = cards.player(opponent).length

    if (myCards > opponentCards) {
      return 2
    }

    return 0
  }
}