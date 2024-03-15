import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Effect } from './Effect'
import { MaterialMove } from '@gamepark/rules-api'

export class KingEffect extends Effect {

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

  get score() {
    const item = this.card.getItem()!
    const kingdom = item.id.back
    const influenceCards =  this
      .material(MaterialType.CharacterCard)
      .location(LocationType.PlayerInfluenceZone)
      .locationId(kingdom)

    const myCards = influenceCards
      .player(this.player)
      .length

    const opponentCards = influenceCards
      .player((p) => p !== this.player)
      .length

    if (myCards > opponentCards) return 3
    return 0
  }
}