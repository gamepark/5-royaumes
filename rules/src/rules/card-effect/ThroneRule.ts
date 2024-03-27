import { isMoveItemType, ItemMove, Material, MaterialGame, MaterialMove, MaterialRulesPart, MoveItem } from '@gamepark/rules-api'
import { Card } from '../../cards/Card'
import { isKing, isQueen, isKingdomTitan, isKingdomWarrior, isSorcerer } from '../../cards/CardType'
import { Kingdom } from '../../cards/Kingdom'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory, ThroneActivationState } from '../Memory'
import { CaptainEffect } from './CaptainEffect'
import { ColonelEffect } from './ColonelEffect'
import { Effect } from './Effect'
import { GaiaEffect } from './GaiaEffect'
import { GeneralEffect } from './GeneralEffect'
import { KingEffect } from './KingEffect'
import { MarshallEffect } from './MarshallEffect'
import { PapesseEffect } from './PapesseEffect'
import { QueenEffect } from './QueenEffect'
import { SorcererEffect } from './SorcererEffect'
import { TitanEffect } from './TitanEffect'
import { WarriorEffect } from './WarriorEffect'
import { WarriorMonkEffect } from './WarriorMonkEffect'

export class ThroneRule extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: Kingdom) {
    super(game)

  }

  getEffectRule(game: MaterialGame, card: Material): Effect | undefined {
    const id = card.getItem()!.id.front
    if (isKing(id)) return new KingEffect(game, this.player, card)
    if (isQueen(id)) return new QueenEffect(game, this.player, card)
    if (isSorcerer(id)) return new SorcererEffect(game, this.player, card)
    if (isKingdomWarrior(id)) return new WarriorEffect(game, this.player, card)
    if (isKingdomTitan(id) || id === Card.Ouranos) return new TitanEffect(game, this.player, card)
    if (id === Card.Papesse) return new PapesseEffect(game, this.player, card)
    if (id === Card.Gaia) return new GaiaEffect(game, this.player, card)
    if (id === Card.Colonel) return new ColonelEffect(game, this.player, card)
    if (id === Card.Captain) return new CaptainEffect(game, this.player, card)
    if (id === Card.WarriorMonk) return new WarriorMonkEffect(game, this.player, card)
    if (id === Card.Marshall) return new MarshallEffect(game, this.player, card)
    if (id === Card.General) return new GeneralEffect(game, this.player, card)
    return
  }

  consumeEffect(card: Material) {
    this.getEffectRule(this.game, card)?.consumeActivation()
  }

  getMoves(card: Material): MaterialMove[] {
    return this.getEffectRule(this.game, card)?.moves ?? []
  }

  onInfluence(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return
    this.controlThrone(move)

    for (const character of this.throneRoom.getIndexes()) {
      const item = this.material(MaterialType.CharacterCard).index(character)
      const effectRule = this.getEffectRule(this.game, item)
      if (effectRule) {
        effectRule.onInfluence(move)
      }
    }
  }

  controlThrone(move: MoveItem) {
    const throneState = this.throneState
    const movesItem = this.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    if (!throneState && movesItem.id.back === this.player && (movesItem.location.x! + 1) === 3) {
      this.memorize(Memory.ThroneActivation, ThroneActivationState.ACTIVATED, this.player)
    }
  }

  get throneState() {
    return this.remind<ThroneActivationState | undefined>(Memory.ThroneActivation, this.player)
  }

  onRecruit(move: MoveItem) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return []
    const cardOnPosition = this
      .material(MaterialType.CharacterCard)
      .location((location) => location.type === LocationType.Council && location.x === move.location?.x)
      .player(this.player)
      .index((index) => index !== move.itemIndex)

    const moves: MaterialMove[] = []
    if (cardOnPosition.length) {
      moves.push(cardOnPosition.moveItem({ type: LocationType.Discard }))
    }

    const recruitedCard = this.material(MaterialType.CharacterCard).index(move.itemIndex)
    const effect = this.getEffectRule(this.game, recruitedCard)
    if (effect) {
      moves.push(...effect.onRecruit(move))
    }

    return moves
  }

  get score() {
    let score = 0
    for (const character of this.throneRoom.getIndexes()) {
      const item = this.material(MaterialType.CharacterCard).index(character)
      const effectRule = this.getEffectRule(this.game, item)
      if (effectRule) {
        score += effectRule.score ?? 0
      }
    }

    return score
  }

  get throneRoom() {
    return this
      .material(MaterialType.CharacterCard)
      .location(LocationType.Council)
      .player(this.player)
  }
}