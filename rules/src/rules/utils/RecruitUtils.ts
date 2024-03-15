import { Material, MaterialGame, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { isTitan } from '../../cards/CardType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class RecruitUtils extends PlayerTurnRule {

  constructor(game: MaterialGame, readonly cards: Material) {
    super(game)

  }

  get recruitMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const titans = this.titans
    const characters = this.throneRoom
    const cards = this.cards.filter((item) =>
      !this.hasCharacter(titans, item) && !this.hasCharacter(characters, item)
    )

    for (const cardIndex of cards.getIndexes()) {
      const card = cards.index(cardIndex)!
      moves.push(...this.recruitCard(card))
    }

    return moves
  }

  hasCharacter(characters: Material, item: MaterialItem): boolean {
    return !!characters.id((id: any) => id.front === item.id.front).length
  }

  get titans() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(this.player)
  }

  get throneRoom() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerThroneRoom).player(this.player)
  }

  recruitCard(card: Material) {
    const charactersInThroneRoom = this.throneRoom.length

    const item = card.getItem()!
    const itemId = item.id.front
    if (!itemId) return []
    if (isTitan(itemId)) {
      return card.moveItems({
        type: LocationType.PlayerTitan,
        player: this.player
      })
    } else {
      return Array.from(Array(4))
        .flatMap((_, x) => {
            if (charactersInThroneRoom < 4) {
              const existingItem = this.throneRoom.location((location) => location.x === x).length > 0
              if (existingItem) return []
            }

            return card.moveItems({
              type: LocationType.PlayerThroneRoom,
              player: this.player,
              x
            })
          }
        )
    }
  }
}