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
import { Kingdom } from './cards/Kingdom'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ActivateCharactersRule } from './rules/ActivateCharactersRule'
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
  item: MaterialItem, player?: Kingdom
) => {
  if (!item.location.rotation) return ['id.front']
  return item.location.player === player ? [] : ['id.front']
}
/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class FiveKingdomsRules extends SecretMaterialRules<Kingdom, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<Kingdom, MaterialType, LocationType>, MaterialMove<Kingdom, MaterialType, LocationType>, Kingdom>,
    TimeLimit<MaterialGame<Kingdom, MaterialType, LocationType>, MaterialMove<Kingdom, MaterialType, LocationType>, Kingdom> {



  rules = {
    [RuleId.DrawBannerCard]: DrawBannerCardRule,
    [RuleId.ChooseAlkaneColor]: ChooseAlkaneColorRule,
    [RuleId.ChooseAction]: ChooseActionRule,
    [RuleId.Influence]: InfluenceRule,
    [RuleId.Recruit]: RecruitRule,
    [RuleId.RefillAlkane]: RefillAlkaneRule,
    [RuleId.Sorcerer]: SorcererRule,
    [RuleId.Warrior]: WarriorRule,
    [RuleId.EndGame]: EndGameRule,
    [RuleId.ActivateCharacter]: ActivateCharactersRule
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

  getScore(playerId: Kingdom): number {
    const playerTitans = this.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(playerId).length
    const otherPlayerTitans = this.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player((p) => p !== playerId).length
    if (playerTitans === 5) return 5
    if (otherPlayerTitans === 5) return playerTitans

    return this.material(MaterialType.Castle)
      .location(LocationType.PlayerCastle)
      .player(playerId)
      .getItem()?.quantity ?? 0
  }

  giveTime(_playerId: Kingdom): number {
    return 60
  }

}