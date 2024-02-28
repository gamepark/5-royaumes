import { Material, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { baseRealms, Realm } from '../../cards/Realm'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class InfluenceUtils extends PlayerTurnRule {

  constructor(game: MaterialGame, readonly cards: Material) {
    super(game)

  }

  get influenceMoves(): MaterialMove[] {
    if (!this.cards.length) return []
    const item = this.cards.getItem()!
    const back = item.id.back
    if (back === Realm.ImperialOrder) {
      return baseRealms
        .filter((realm) => this.material(MaterialType.CharacterCard).location(LocationType.PlayerInfluenceZone).locationId(realm).player(this.player).length > 0)
        .flatMap((realm) => this.cards.moveItems({
          type: LocationType.PlayerInfluenceZone,
          player: this.player,
          id: realm
        }))
    }

    return this.cards.moveItems({
      type: LocationType.PlayerInfluenceZone,
      player: this.player,
      id: back
    })
  }
}