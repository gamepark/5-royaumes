import { MaterialMove } from '@gamepark/rules-api'
import { baseRealms } from '../../cards/Realm'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Effect } from './Effect'

export class CaptainEffect extends Effect {

    onInfluence(): MaterialMove[] {
      const columns = baseRealms
      const moves: MaterialMove[] = []
      const columnCards = this.material(MaterialType.CharacterCard).location(LocationType.PlayerInfluenceZone)
      for (const realm of columns) {
        const realmCards = columnCards.locationId(realm)
        const myCount = realmCards.player(this.player).length
        if (myCount > realmCards.player((p) => p !== this.player).length) {
          moves.push(
            this.material(MaterialType.Castle).createItem({ location: { type: LocationType.PlayerCastle, player: this.player }})
          )
        }
      }

      return moves
  }

  onRecruit() {
    return this.onGameEnd()
  }

  onGameEnd(): MaterialMove[] {
    const opponent = this.game.players.find((p) => p !== this.player)!

    let castles = 0
    for (const realm of baseRealms) {
      const myInfluenceCount = this.material(MaterialType.CharacterCard).location(LocationType.PlayerInfluenceZone).locationId(realm).player(this.player).length
      const opponentInfluenceCount = this.material(MaterialType.CharacterCard).location(LocationType.PlayerInfluenceZone).locationId(realm).player(opponent).length
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