import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ThroneRule } from './card-effect/ThroneRule'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'
import { RecruitUtils } from './utils/RecruitUtils'

export class RecruitRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = this
      .hand
      .rotateItems(true)

    return moves
  }

  getPlayerMoves() {
    return [
      ...new RecruitUtils(this.game, this.hand).recruitMoves,
      this.rules().customMove(CustomMoveType.Discard)
    ]
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return []
    if (move.location.type !== LocationType.PlayerThroneRoom && move.location.type !== LocationType.PlayerTitan) return []
    return new ThroneRule(this.game, this.player).onRecruit(move)
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Discard)(move)) return []
    return this.discardHand
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return []

    const moves: MaterialMove[] = []

    if ((move.location.type === LocationType.PlayerHand && move.location.rotation && !this.hiddenCards.length && !new RecruitUtils(this.game, this.hand).recruitMoves.length)
      || move.location.type === LocationType.PlayerThroneRoom || move.location.type === LocationType.PlayerTitan) {
      moves.push(...this.discardHand)
      if (move.location.type === LocationType.PlayerTitan) {
        const titans = this.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(this.player).length
        if (titans === 5) {
          moves.push(this.rules().endGame())
          return moves
        }
      }

    }

    return moves
  }

  get hiddenCards() {
    return this.hand.rotation((r) => r === undefined)
  }

  get discardHand() {
    return [
      ...this.hand.moveItems({ type: LocationType.Discard }),
      this.rules().startRule(RuleId.RefillAlkane)
    ]
  }

  get hand() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(this.player)
  }
}