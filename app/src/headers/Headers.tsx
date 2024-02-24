/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { ComponentType } from 'react'
import { ChooseBannerCardHeader } from './ChooseBannerCardHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.ChooseBannerCard]: ChooseBannerCardHeader
}