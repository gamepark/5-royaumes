/** @jsxImportSource @emotion/react */
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { MaterialHelpProps, PlayMoveButton, useLegalMoves, useRules } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { helpButton } from '../../style/style'

export const CharacterCardHelp: FC<MaterialHelpProps> = (props) => {
  const { itemIndex, closeDialog } = props
  const legalMoves = useLegalMoves()
  const { t } = useTranslation()
  const select = legalMoves.find((move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.itemIndex === itemIndex)
  const rules = useRules<FiveKingdomsRules>()!

  return (
    <>
      {!!select && <div css={helpButton}><PlayMoveButton move={rules.material(MaterialType.CharacterCard).index(select.itemIndex).selectItem()} local onPlay={closeDialog}>{t('Take this card in hand')}</PlayMoveButton></div>}
    </>
  )
}