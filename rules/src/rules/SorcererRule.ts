import { isMoveItemType, isSelectItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ThroneRule } from './card-effect/ThroneRule'
import { RuleId } from './RuleId'
import { PlaceCardRule } from './utils/PlaceCardRule'

export class SorcererRule extends PlayerTurnRule {

  getPlayerMoves() {
    const discard = this.discard
    const selected = discard.selected()
    const unselected = discard.filter((item) => !item.selected)
    const moves: MaterialMove[] = []
    if (selected.length) {
      const rule = new PlaceCardRule(this.game, selected.getIndex())
      moves.push(...rule.recruitMoves)
      moves.push(...rule.influenceMoves)
    }

    moves.push(...unselected.selectItems())
    return moves
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.CharacterCard)(move)) {
      delete this.discard.getItem(move.itemIndex)?.selected
    }

    if (isSelectItemType(MaterialType.CharacterCard)(move)) {
      const selected = this.discard.selected()
      if (selected.getIndex() !== move.itemIndex) {
        delete selected.getItem()?.selected
      }
    }


    return []
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterCard)(move)) return []
    const moves: MaterialMove[] = []
    const effectRule = new ThroneRule(this.game, this.player)
    if (move.location.type === LocationType.PlayerInfluenceZone) {
      moves.push(...effectRule.onInfluence(move))
    }

    if (move.location.type === LocationType.PlayerThroneRoom || move.location.type === LocationType.PlayerTitan) {
      moves.push(...effectRule.onRecruit(move))
    }

    if (move.location.type === LocationType.PlayerTitan) {
      const titans = this.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(this.player).length
      if (titans === 5) {
        moves.push(this.rules().endGame())
        return moves
      }
    }

    moves.push(this.rules().startRule(RuleId.Influence))

    return moves
  }

  get discard() {
    return this.material(MaterialType.CharacterCard).location(LocationType.Discard)
  }
}