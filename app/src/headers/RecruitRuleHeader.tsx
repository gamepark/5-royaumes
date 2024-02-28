/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/5-royaumes/rules/CustomMoveType'
import { PlayMoveButton, useLegalMoves } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const RecruitRuleHeader = () => {
  const legalMoves = useLegalMoves()
  const { t } = useTranslation()
  const pass = legalMoves.find((move) => isCustomMoveType(CustomMoveType.Discard)(move))
  return <>
    <PlayMoveButton move={pass}>{t('Pass')}</PlayMoveButton>
  </>
}
