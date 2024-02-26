import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class RecruitRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = this
      .hand
      .rotateItems(true)

    return moves;
  }

  getPlayerMoves() {
    return Array.from(Array(4))
      .flatMap((_, x) =>
        this.hand.moveItems({
          type: LocationType.PlayerThroneRoom,
          player: this.player,
          x
        })
      )
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move) || move.location.type !== LocationType.PlayerThroneRoom) return []
    const cardOnPosition = this
      .material(MaterialType.CharacterCard)
      .location((location) => location.type === LocationType.PlayerThroneRoom && location.x === move.location.x)
      .player(this.player)

    if (cardOnPosition.length) {
      return [
        cardOnPosition.moveItem({ type: LocationType.Discard })
      ]
    }

    return []
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move) || move.location.type !== LocationType.PlayerThroneRoom) return []

    const moves: MaterialMove[] = []
    moves.push(...this.hand.moveItems({ type: LocationType.Discard }))
    moves.push(this.rules().startRule(RuleId.RefillAlkane))
    return moves
  }

  get hand() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(this.player)
  }
}