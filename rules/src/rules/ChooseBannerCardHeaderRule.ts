import { MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { AlkaneSquareRule } from './utils/AlkaneSquareRule'

export class ChooseBannerCardHeaderRule extends PlayerTurnRule {
  getPlayerMoves() {
    const moves: MoveItem[] = []
    const alkaneSquareRule = new AlkaneSquareRule(this.game)
    const bannerCard = this.bannerCard
    for (const location of alkaneSquareRule.validAlkaneSquare) {
      moves.push(
        bannerCard.moveItem(location)
      )
    }

    return moves
  }

  get alkaneCards() {
    return this
      .material(MaterialType.CharacterCard)
      .location(LocationType.AlkaneSquare)
  }

  get bannerCard() {
    return this.material(MaterialType.CharacterCard)
      .location(LocationType.BannerDeck)
      .maxBy((item) => item.location.x!)
  }

  afterItemMove() {
    if (this.player !== this.game.players[0]) return []
    return [
      this.rules().startPlayerTurn(RuleId.ChooseBannerCard, this.nextPlayer)
    ]
  }
}