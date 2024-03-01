import { CustomMove, isCustomMoveType, isStartRule, MaterialMove, PlayerTurnRule, RuleMove } from '@gamepark/rules-api'
import uniq from 'lodash/uniq'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ThroneRule } from './card-effect/ThroneRule'
import { CustomMoveType } from './CustomMoveType'
import { Memory, ThroneActivationState } from './Memory'
import { RuleId } from './RuleId'

export class ActivateCharactersRule extends PlayerTurnRule {
  onRuleStart() {
    const activations = this.activations
    this.forget(Memory.CurrentCharacter)
    if (!activations.length) return this.goToRefillMoves
    if (activations.length === 1) return [this.rules().customMove(CustomMoveType.ActivateCharacter, activations[0])]

    return []
  }

  getPlayerMoves() {
    const cards = uniq(this.activations)
    return cards.map((card) => this.rules().customMove(CustomMoveType.ActivateCharacter, card))
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.ActivateCharacter)(move)) return []
    this.memorize(Memory.CurrentCharacter, move.data)
    const item = this.material(MaterialType.CharacterCard).index(move.data)
    const throne = new ThroneRule(this.game, this.player)
    const moves = throne.getMoves(item)
    throne.consumeEffect(item)
    if (moves.some(isStartRule)) return moves
    if (this.activations.length) moves.push(this.rules().startRule(RuleId.ActivateCharacter))
    if (!this.activations.length) moves.push(...this.goToRefillMoves)
    return moves
  }

  onRuleEnd(move: RuleMove) {
    if (isStartRule(move) && move.id === RuleId.RefillAlkane) {
      this.forget(Memory.ActivatedCharacters)
      this.forget(Memory.CurrentCharacter)
    }

    return super.onRuleEnd(move)
  }

  get goToRefillMoves() {
    const moves: MaterialMove[] = this.throneEffectMoves
    moves.push(this.rules().startRule(RuleId.RefillAlkane))
    return moves
  }

  get throneEffectMoves() {
    const throneState = this.throneState
    if (throneState === ThroneActivationState.ACTIVATED) {
      this.memorize(Memory.ThroneActivation, ThroneActivationState.CONSUMED, this.player)
      return [
        this
          .material(MaterialType.Castle)
          .createItem({
            location: {
              type: LocationType.PlayerCastle,
              player: this.player
            },
            quantity: 2
          })
      ]
    }

    return []
  }

  get throneState() {
    return this.remind<ThroneActivationState | undefined>(Memory.ThroneActivation, this.player)
  }

  get currentCharacter() {
    return this.remind(Memory.CurrentCharacter)
  }


  get activations() {
    return this.remind<number[]>(Memory.ActivatedCharacters) ?? []
  }
}