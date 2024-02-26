import {
  CompetitiveScore,
  hideFront,
  HidingStrategy,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { PlayerId } from './FiveRealmsOptions'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ChooseActionRule } from './rules/ChooseActionRule'
import { ChooseAlkaneColorRule } from './rules/ChooseAlkaneColorRule'
import { DrawBannerCardRule } from './rules/DrawBannerCardRule'
import { InfluenceRule } from './rules/InfluenceRule'
import { RecruitRule } from './rules/RecruitRule'
import { RefillAlkaneRule } from './rules/RefillAlkaneRule'
import { RuleId } from './rules/RuleId'


export const hideCardWhenNotRotated: HidingStrategy = (
  item: MaterialItem, player?: PlayerId
) => {
  if (!item.location.rotation) return ['id.front']
  return item.location.player === player ? [] : ['id.front']
}
/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class FiveRealmsRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>,
    TimeLimit<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {



  rules = {
    [RuleId.DrawBannerCard]: DrawBannerCardRule,
    [RuleId.ChooseAlkaneColor]: ChooseAlkaneColorRule,
    [RuleId.ChooseAction]: ChooseActionRule,
    [RuleId.Influence]: InfluenceRule,
    [RuleId.Recruit]: RecruitRule,
    [RuleId.RefillAlkane]: RefillAlkaneRule
  }

  locationsStrategies = {
    [MaterialType.CharacterCard]: {
      [LocationType.BannerDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerInfluenceZone]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.CharacterCard]: {
      [LocationType.BannerDeck]: hideFront,
      [LocationType.AlkaneSquare]: hideFront,
      [LocationType.PlayerHand]: hideCardWhenNotRotated,
      [LocationType.PlayerInfluenceZone]: hideFront,
    }
  }

  getScore(playerId: PlayerId): number {
    return this.material(MaterialType.Castle)
      .location(LocationType.PlayerCastle)
      .player(playerId)
      .getItem()?.quantity ?? 0
  }

  giveTime(_playerId: PlayerId): number {
    return 60
  }

}