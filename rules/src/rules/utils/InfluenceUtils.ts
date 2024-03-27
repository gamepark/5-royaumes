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
    const indexes = this.cards.getIndexes()
    const moves: MaterialMove[] = []
    for (const index of indexes) {
      const item = this.cards.getItem(index)!
      const card = this.cards.index(index)
      const back = item.id.back
      if (back === Kingdom.ReligiousOrder) continue
      if (back === Kingdom.ImperialOrder) {
        moves.push(
          ...baseKingdoms
            .filter((kingdom) => this.material(MaterialType.CharacterCard).location(LocationType.PlayerInfluenceZone).locationId(kingdom).player(this.player).length > 0)
            .map((kingdom) => card.moveItem({
              type: LocationType.PlayerInfluenceZone,
              player: this.player,
              id: kingdom
            }))
        )
      } else {
        moves.push(
          card.moveItem({
            type: LocationType.PlayerInfluenceZone,
            player: this.player,
            id: back
          })
        )
      }
    }

    return moves
  }
}