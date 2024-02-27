import { isMoveItemType, ItemMove, Material, MaterialGame, MaterialMove, MaterialRulesPart, MoveItem } from '@gamepark/rules-api'
import { Card } from '../../cards/Card'
import { isKing, isQueen, isRealmTitan, isRealmWarrior, isSorcerer } from '../../cards/CardType'
import { Realm } from '../../cards/Realm'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
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

  constructor(game: MaterialGame, readonly player: Realm) {
    super(game)

  }


  getEffectRule(game: MaterialGame, card: Material): Effect | undefined {
    const id = card.getItem()!.id.front
    if (isKing(id)) return new KingEffect(game, this.player, card)
    if (isQueen(id)) return new QueenEffect(game, this.player, card)
    if (isSorcerer(id)) return new SorcererEffect(game, this.player, card)
    if (isRealmWarrior(id)) return new WarriorEffect(game, this.player, card)
    if (isRealmTitan(id) || id === Card.Ouranos) return new TitanEffect(game, this.player, card)
    if (id === Card.Papesse) return new PapesseEffect(game, this.player, card)
    if (id === Card.Gaia) return new GaiaEffect(game, this.player, card)
    if (id === Card.Colonel) return new ColonelEffect(game, this.player, card)
    if (id === Card.Captain) return new CaptainEffect(game, this.player, card)
    if (id === Card.WarriorMonk) return new WarriorMonkEffect(game, this.player, card)
    if (id === Card.Marshall) return new MarshallEffect(game, this.player, card)
    if (id === Card.General) return new GeneralEffect(game, this.player, card)
    return
  }

  onInfluence(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return []
    const moves: MaterialMove[] = []
    for (const character of this.throneRoom.getIndexes()) {
      const item = this.material(MaterialType.CharacterCard).index(character)
      const effectRule = this.getEffectRule(this.game, item)
      if (effectRule) {
        moves.push(...effectRule.onInfluence(move))
      }
    }

    return moves
  }

  onRecruit(move: MoveItem) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return []
    const cardOnPosition = this
      .material(MaterialType.CharacterCard)
      .location((location) => location.type === LocationType.PlayerThroneRoom && location.x === move.location.x)
      .player(this.player)

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

  getScore() {
    let score = 0
    for (const character of this.throneRoom.getIndexes()) {
      const item = this.material(MaterialType.CharacterCard).index(character)
      const effectRule = this.getEffectRule(this.game, item)
      if (effectRule) {
        score += effectRule.getScore() ?? 0
      }
    }

    return score
  }

  get throneRoom() {
    return this
      .material(MaterialType.CharacterCard)
      .location(LocationType.PlayerThroneRoom)
      .player(this.player)
  }
}