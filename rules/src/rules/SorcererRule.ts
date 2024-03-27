import { isMoveItemType, isSelectItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ThroneRule } from './card-effect/ThroneRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { InfluenceUtils } from './utils/InfluenceUtils'
import { RecruitUtils } from './utils/RecruitUtils'

export class SorcererRule extends PlayerTurnRule {

  getPlayerMoves() {
    const discard = this.discard
    const moves: MaterialMove[] = []
    if (discard.length) {
      moves.push(...new RecruitUtils(this.game, discard).recruitMoves)
      moves.push(...new InfluenceUtils(this.game, discard).influenceMoves)
    }
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
    if (!isMoveItemType(MaterialType.CharacterCard)(move) || move.location?.type === LocationType.Discard) return []
    const moves: MaterialMove[] = []
    const effectRule = new ThroneRule(this.game, this.player)
    if (move.location?.type === LocationType.PlayerInfluenceZone) {
      effectRule.onInfluence(move)
    }

    if (move.location?.type === LocationType.Council || move.location?.type === LocationType.PlayerTitan) {
      moves.push(...effectRule.onRecruit(move))
    }

    if (move.location?.type === LocationType.PlayerTitan) {
      const titans = this.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(this.player).length
      if (titans === 5) {
        moves.push(this.rules().endGame())
        return moves
      }
    }
    moves.push(this.rules().startRule(RuleId.ActivateCharacter))

    return moves
  }

  get discard() {
    return this.material(MaterialType.CharacterCard).location(LocationType.Discard)
  }

  get hand() {
    return this.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(this.player)
  }

  get character() {
    return this.remind<number>(Memory.CurrentCharacter)
  }
}