/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { ComponentType } from 'react'
import { ChooseActionRuleHeader } from './ChooseActionRuleHeader'
import { ChooseAlkaneColorRuleHeader } from './ChooseAlkaneColorRuleHeader'
import { DrawBannerCardRuleHeader } from './DrawBannerCardRuleHeader'
import { RecruitRuleHeader } from './RecruitRuleHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DrawBannerCard]: DrawBannerCardRuleHeader,
  [RuleId.ChooseAlkaneColor]: ChooseAlkaneColorRuleHeader,
  [RuleId.ChooseAction]: ChooseActionRuleHeader,
  [RuleId.Influence]: () => <>Influence</>,
  [RuleId.Recruit]: RecruitRuleHeader,
  [RuleId.RefillAlkane]: () => <>RefillAlkane</>,
  [RuleId.Sorcerer]: () => <>Sorcerer</>,
  [RuleId.Warrior]: () => <>Warrior</>,
}