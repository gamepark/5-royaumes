import { Material, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { isTitan } from '../../cards/CardType'
import { Realm, realms } from '../../cards/Realm'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class PlaceCardRule extends PlayerTurnRule {

  private card: Material

  constructor(game: MaterialGame, cardIndex: number) {
    super(game)
    this.card = this.material(MaterialType.CharacterCard).index(cardIndex)

  }

  get recruitMoves(): MaterialMove[] {
    const item = this.card.getItem()!
    const itemId = item.id.front
    if (!itemId) return []

    if (isTitan(itemId)) {
      return this.card.moveItems({
        type: LocationType.PlayerTitan,
        player: this.player
      })
    } else {
      return Array.from(Array(4))
        .flatMap((_, x) =>
          this.card.moveItems({
            type: LocationType.PlayerThroneRoom,
            player: this.player,
            x
          })
        )
    }
  }

  get influenceMoves(): MaterialMove[] {
    const item = this.card.getItem()!
    const back = item.id.back
    if (back === Realm.ImperialOrder) {
      return realms
        .filter((realm) => this.material(MaterialType.CharacterCard).location(LocationType.PlayerInfluenceZone).locationId(realm).player(this.player).length > 0)
        .map((realm) => this.card.moveItem({
          type: LocationType.PlayerInfluenceZone,
          player: this.player,
          id: realm
        }))
    }

    return this.card.moveItems({
      type: LocationType.PlayerInfluenceZone,
      player: this.player,
      id: back
    })
  }
}