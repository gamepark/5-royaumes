/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isStartRule, StartRule } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const ChooseActionRuleHeader = () => {
  const playerId = usePlayerId()
  const { t } = useTranslation()
  const rules = useRules()!
  const activePlayer = rules.getActivePlayer()
  const name = usePlayerName(activePlayer)
  const legalMoves = useLegalMoves<StartRule>(isStartRule)
  const influence = legalMoves.find((move) => move.id === RuleId.Influence)
  const recruit = legalMoves.find((move) => move.id === RuleId.Recruit)

  if (activePlayer === playerId) {
    return (
      <Trans defaults="header.action.you">
        <PlayMoveButton move={recruit} />
        <PlayMoveButton move={influence} />
      </Trans>
    )
  }

  return <>{t('header.action.player', { player: name })}</>
}
