/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { MaterialHelpProps, PlayMoveButton, useLegalMoves } from '@gamepark/react-game'
import { isSelectItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { helpButton } from '../../style/style'

export const CharacterCardHelp: FC<MaterialHelpProps> = (props) => {
  const { itemIndex, closeDialog } = props
  const legalMoves = useLegalMoves()
  const { t } = useTranslation()
  const select = legalMoves.find((move) => isSelectItemType(MaterialType.CharacterCard)(move) && move.itemIndex === itemIndex)

  return (
    <>
      {!!select && <div css={helpButton}><PlayMoveButton move={select} onPlay={closeDialog}>{t('Take this card in hand')}</PlayMoveButton></div>}
    </>
  )
}