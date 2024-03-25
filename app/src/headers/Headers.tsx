/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { ComponentType } from 'react'
import { ActivateCharacterRuleHeader } from './ActivateCharacterRuleHeader'
import { ChooseActionRuleHeader } from './ChooseActionRuleHeader'
import { ChooseAlkaneColorRuleHeader } from './ChooseAlkaneColorRuleHeader'
import { DrawBannerCardRuleHeader } from './DrawBannerCardRuleHeader'
import { InfluenceRuleHeader } from './InfluenceRuleHeader'
import { RecruitRuleHeader } from './RecruitRuleHeader'
import { RefillAlkaneRuleHeader } from './RefillAlkaneRuleHeader'
import { SorcererRuleHeader } from './SorcererRuleHeader'
import { WarriorRuleHeader } from './WarriorRuleHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DrawBannerCard]: DrawBannerCardRuleHeader,
  [RuleId.ChooseAlkaneColor]: ChooseAlkaneColorRuleHeader,
  [RuleId.ChooseAction]: ChooseActionRuleHeader,
  [RuleId.Influence]: InfluenceRuleHeader,
  [RuleId.Recruit]: RecruitRuleHeader,
  [RuleId.RefillAlkane]: RefillAlkaneRuleHeader,
  [RuleId.ActivateCharacter]: ActivateCharacterRuleHeader,
  [RuleId.Sorcerer]: SorcererRuleHeader,
  [RuleId.Warrior]: WarriorRuleHeader,
}