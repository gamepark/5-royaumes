import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class WarriorRule extends PlayerTurnRule {

  getPlayerMoves() {
    const moves: MaterialMove[] = []

    // Stole castle
    const castle = this.opponentCastle
    if ((castle.getItem()?.quantity ?? 0) > 0) {
      moves.push(
        castle.moveItem({
          type: LocationType.PlayerCastle,
          player: this.player
        })
      )
    }

    const titans = this.opponentTitan
    if (titans.length) {
      moves.push(
        ...titans.moveItems({
          type: LocationType.Discard
        })
      )
    }

    const character = this.opponentCharacter
    if (character.length) {
      moves.push(
        ...character.moveItems({
          type: LocationType.Discard
        })
      )
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move) && !isMoveItemType(MaterialType.Castle)(move)) return []
    return [this.rules().startRule(RuleId.Influence)]
  }

  get opponentCastle() {
    return this.material(MaterialType.Castle).location(LocationType.PlayerCastle).player(this.opponent)
  }

  get opponentTitan() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(this.opponent)
  }

  get opponentCharacter() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerThroneRoom).player(this.opponent)
  }

  get opponent() {
    return this.game.players.find((p) => p !== this.player)
  }
}