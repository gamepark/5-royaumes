import { Material, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { baseKingdoms, Kingdom } from '../../cards/Kingdom'
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
    if (back === Kingdom.ReligiousOrder) return []
    if (back === Kingdom.ImperialOrder) {
      return baseKingdoms
        .filter((kingdom) => this.material(MaterialType.CharacterCard).location(LocationType.PlayerInfluenceZone).locationId(kingdom).player(this.player).length > 0)
        .flatMap((kingdom) => this.cards.moveItems({
          type: LocationType.PlayerInfluenceZone,
          player: this.player,
          id: kingdom
        }))
    }

    return this.cards.moveItems({
      type: LocationType.PlayerInfluenceZone,
      player: this.player,
      id: back
    })
  }
}