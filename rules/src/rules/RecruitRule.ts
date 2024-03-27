import { CustomMove, isCustomMoveType, isEndGame, isMoveItemType, isStartRule, ItemMove, MaterialMove, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
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

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Discard)(move)) return []
    return [
      ...this.discardHand(),
      this.goToActivation()
    ]
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return []
    if ((move.location?.type === LocationType.PlayerHand && move.location?.rotation && !this.hiddenCards.length && !new RecruitUtils(this.game, this.hand).recruitMoves.length)) {
      return [
        ...this.discardHand(),
        this.goToActivation()
      ]
    }

    const moves: MaterialMove[] = []
    if (move.location?.type === LocationType.Council || move.location?.type === LocationType.PlayerTitan) {
      const recruitMoves = new ThroneRule(this.game, this.player).onRecruit(move)
      const onRecruit = this.onRecruit(move)
      if (recruitMoves.some(isStartRule)) {

        if (onRecruit.some(isEndGame)) {
          moves.push(...recruitMoves.filter((move) => !isStartRule(move)))
          moves.push(...onRecruit)
        } else {
          moves.push(...onRecruit)
          moves.push(...recruitMoves)
        }

        return moves
      }

      moves.push(...recruitMoves)
      moves.push(...onRecruit)
      if (!onRecruit.some(isEndGame)) {
        moves.push(this.goToActivation())
      }
    }

    return moves
  }

  onRecruit(move: MoveItem) {
    const moves: MaterialMove[] = []
    moves.push(...this.discardHand())
    if (move.location?.type === LocationType.PlayerTitan) {
      const titans = this.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(this.player).length
      if (titans === 5) {
        moves.push(this.rules().endGame())
        return moves
      }
    }

    return moves
  }

  get hiddenCards() {
    return this.hand.rotation((r) => r === undefined)
  }

  discardHand() {
    return this.hand.moveItems({ type: LocationType.Discard })
  }

  goToActivation() {
    return this.rules().startRule(RuleId.ActivateCharacter)
  }


  get hand() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(this.player)
  }
}