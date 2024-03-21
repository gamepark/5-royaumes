/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/5-royaumes/rules/CustomMoveType'
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const RecruitRuleHeader = () => {
  const legalMoves = useLegalMoves()
  const { t } = useTranslation()
  const pass = legalMoves.find((move) => isCustomMoveType(CustomMoveType.Discard)(move))
  const playerId = usePlayerId()
  const rules = useRules()!
  const activePlayer = rules.getActivePlayer()
  const name = usePlayerName(activePlayer)

  if (activePlayer === playerId) {
    return (
      <Trans defaults="header.recruit.you">
        <PlayMoveButton move={pass} />
      </Trans>
    )
  }
  return <>{t('header.recruit.player', { player: name })}</>
}
