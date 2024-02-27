import { MaterialMove, MoveItem } from '@gamepark/rules-api'
import { baseRealms, Realm } from '../../cards/Realm'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Effect } from './Effect'

export class ColonelEffect extends Effect {

  onInfluence(move: MoveItem): MaterialMove[] {
    const influenceCard = this.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    const lineSize = this
      .material(MaterialType.CharacterCard)
      .location((location) => location.type === LocationType.PlayerInfluenceZone && location.x === influenceCard.location.x)
      .player(this.player)
      .length

    if (lineSize !== 5) return []
    return [
      this.material(MaterialType.Castle).createItem({ location: { type: LocationType.PlayerCastle, player: this.player }})
    ]
  }

  onGameEnd(): MaterialMove[] {
    const opponent = this.game.players.find((p) => p !== this.player)!

    const myInfluenceLines = this.getInfluenceLines(this.player)
    const opponentInfluenceLines = this.getInfluenceLines(opponent)

    if (myInfluenceLines > opponentInfluenceLines) {
      return [
        this
          .material(MaterialType.Castle)
          .player(this.player)
          .createItem({
            location: {
              type: LocationType.PlayerCastle,
              player: this.player
            },
            quantity: 2
          })
      ]
    }

    return []
  }

  getInfluenceLines(playerId: Realm) {
    const influenceCards = this
      .material(MaterialType.CharacterCard)
      .location(LocationType.PlayerInfluenceZone)
      .player(playerId)
      let influenceLines: number | undefined = undefined

      for (const realm of baseRealms) {
        const size = influenceCards.locationId(realm).maxBy((item) => item.location.x!)?.getItem()?.location.x ?? 0
        if (influenceLines === undefined || size < influenceLines) {
          influenceLines = size
        }
      }

      return influenceLines ?? 0
  }
}