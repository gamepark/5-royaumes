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
import { Realm } from './cards/Realm'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ThroneRule } from './rules/card-effect/ThroneRule'
import { ChooseActionRule } from './rules/ChooseActionRule'
import { ChooseAlkaneColorRule } from './rules/ChooseAlkaneColorRule'
import { DrawBannerCardRule } from './rules/DrawBannerCardRule'
import { EndGameRule } from './rules/EndGameRule'
import { InfluenceRule } from './rules/InfluenceRule'
import { RecruitRule } from './rules/RecruitRule'
import { RefillAlkaneRule } from './rules/RefillAlkaneRule'
import { RuleId } from './rules/RuleId'
import { SorcererRule } from './rules/SorcererRule'
import { WarriorRule } from './rules/WarriorRule'


export const hideCardWhenNotRotated: HidingStrategy = (
  item: MaterialItem, player?: Realm
) => {
  if (!item.location.rotation) return ['id.front']
  return item.location.player === player ? [] : ['id.front']
}
/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class FiveRealmsRules extends SecretMaterialRules<Realm, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<Realm, MaterialType, LocationType>, MaterialMove<Realm, MaterialType, LocationType>, Realm>,
    TimeLimit<MaterialGame<Realm, MaterialType, LocationType>, MaterialMove<Realm, MaterialType, LocationType>, Realm> {



  rules = {
    [RuleId.DrawBannerCard]: DrawBannerCardRule,
    [RuleId.ChooseAlkaneColor]: ChooseAlkaneColorRule,
    [RuleId.ChooseAction]: ChooseActionRule,
    [RuleId.Influence]: InfluenceRule,
    [RuleId.Recruit]: RecruitRule,
    [RuleId.RefillAlkane]: RefillAlkaneRule,
    [RuleId.Sorcerer]: SorcererRule,
    [RuleId.Warrior]: WarriorRule,
    [RuleId.EndGame]: EndGameRule
  }

  locationsStrategies = {
    [MaterialType.CharacterCard]: {
      [LocationType.BannerDeck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerInfluenceZone]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy(),
      [LocationType.PlayerTitan]: new PositiveSequenceStrategy()
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

  getScore(playerId: Realm): number {
    const castle = this.material(MaterialType.Castle)
      .location(LocationType.PlayerCastle)
      .player(playerId)
      .getItem()?.quantity ?? 0

    const throneRule = new ThroneRule(this.game, playerId)
    return castle + throneRule.getScore()
  }

  giveTime(_playerId: Realm): number {
    return 60
  }

}