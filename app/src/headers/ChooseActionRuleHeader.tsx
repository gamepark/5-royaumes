/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { PlayMoveButton, useLegalMoves } from '@gamepark/react-game'
import { isStartRule, StartRule } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const ChooseActionRuleHeader = () => {
  const { t } = useTranslation()
  const legalMoves = useLegalMoves<StartRule>(isStartRule)
  const influence = legalMoves.find((move) => move.id === RuleId.Influence)
  const recruit = legalMoves.find((move) => move.id === RuleId.Recruit)
  return <>
    <PlayMoveButton move={influence}>
      {t('Influence')}
    </PlayMoveButton>
    &nbsp;OR&nbsp;
    <PlayMoveButton move={recruit}>
      {t('Recruit')}
    </PlayMoveButton>
  </>
}
