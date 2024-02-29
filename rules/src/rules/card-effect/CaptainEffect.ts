import { MaterialMove } from '@gamepark/rules-api'
import { baseKingdoms } from '../../cards/Kingdom'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Effect } from './Effect'

export class CaptainEffect extends Effect {

  onInfluence(): MaterialMove[] {
    const columns = baseKingdoms
    const moves: MaterialMove[] = []
    const columnCards = this.material(MaterialType.CharacterCard).location(LocationType.PlayerInfluenceZone)
    for (const kingdom of columns) {
      const kingdomCards = columnCards.locationId(kingdom)
      const myCount = kingdomCards.player(this.player).length
      if (myCount > kingdomCards.player((p) => p !== this.player).length) {
        this.addActivation()
      }
    }

    return moves
  }

  get moves() {
    return [
      this.material(MaterialType.Castle).createItem({ location: { type: LocationType.PlayerCastle, player: this.player } })
    ]
  }

  onRecruit() {
    return this.onGameEnd()
  }

  onGameEnd(): MaterialMove[] {
    const opponent = this.game.players.find((p) => p !== this.player)!

    let castles = 0
    for (const kingdom of baseKingdoms) {
      const myInfluenceCount = this.material(MaterialType.CharacterCard).location(LocationType.PlayerInfluenceZone).locationId(kingdom).player(this.player).length
      const opponentInfluenceCount = this.material(MaterialType.CharacterCard).location(LocationType.PlayerInfluenceZone).locationId(kingdom).player(opponent).length
      if (myInfluenceCount > opponentInfluenceCount) castles++
    }

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
}