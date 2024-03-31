import { MaterialMove, MoveItem } from '@gamepark/rules-api'
import { baseKingdoms, Kingdom } from '../../cards/Kingdom'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Effect } from './Effect'

export class ColonelEffect extends Effect {

  onInfluence(move: MoveItem) {
    const influenceCard = this.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    const lineSize = this
      .material(MaterialType.CharacterCard)
      .location((location) => location.type === LocationType.PlayerInfluenceZone && location.x === influenceCard.location.x)
      .player(this.player)
      .length

    if (lineSize !== 5) return
    this.addActivation()
  }

  get moves() {
    return [
      this.material(MaterialType.Castle).createItem({ location: { type: LocationType.PlayerCastle, player: this.player } })
    ]
  }

  get score() {
    const opponent = this.game.players.find((p) => p !== this.player)!

    const myInfluenceLines = this.getInfluenceLines(this.player)
    const opponentInfluenceLines = this.getInfluenceLines(opponent)

    if (myInfluenceLines > opponentInfluenceLines) {
      return 2
    }

    return 0
  }

  onGameEnd(): MaterialMove[] {
    const castles = this.score
    if (castles) {
      return [
        this
          .material(MaterialType.Castle)
          .player(this.player)
          .createItem({
            location: {
              type: LocationType.PlayerCastle,
              player: this.player
            },
            quantity: castles
          })
      ]
    }


    return super.onGameEnd()
  }

  getInfluenceLines(playerId: Kingdom) {
    const influenceCards = this
      .material(MaterialType.CharacterCard)
      .location(LocationType.PlayerInfluenceZone)
      .player(playerId)
    let influenceLines: number | undefined = undefined

    for (const kingdom of baseKingdoms) {
      const size = influenceCards.locationId(kingdom).maxBy((item) => item.location.x!)?.getItem()?.location.x ?? 0
      if (influenceLines === undefined || size < influenceLines) {
        influenceLines = size
      }
    }

    return influenceLines ?? 0
  }
}