import { MaterialMove } from '@gamepark/rules-api'
import { baseKingdoms } from '../../cards/Kingdom'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Effect } from './Effect'

export class CaptainEffect extends Effect {

  get moves() {
    return [
      this.material(MaterialType.Castle).createItem({ location: { type: LocationType.PlayerCastle, player: this.player } })
    ]
  }

  onRecruit() {
    return this.onGameEnd()
  }

  get score(): number | undefined {
    const opponent = this.game.players.find((p) => p !== this.player)!

    let castles = 0
    for (const kingdom of baseKingdoms) {
      const myInfluenceCount = this.material(MaterialType.CharacterCard).location(LocationType.PlayerInfluenceZone).locationId(kingdom).player(this.player).length
      const opponentInfluenceCount = this.material(MaterialType.CharacterCard).location(LocationType.PlayerInfluenceZone).locationId(kingdom).player(opponent).length
      if (myInfluenceCount > opponentInfluenceCount) castles++
    }

    return castles
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
}