/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { FC } from 'react'
import { MaterialHelpProps, PlayMoveButton, useLegalMoves } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { helpButton } from '../../style/style'

export const CharacterCardHelp: FC<MaterialHelpProps> = (props) => {
  const { itemIndex, closeDialog } = props
  const legalMoves = useLegalMoves()
  const { t } = useTranslation()
  const choose = legalMoves.find((move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.location.type === LocationType.PlayerHand && move.itemIndex === itemIndex)

  return (
    <>
      {!!choose && <div css={helpButton}><PlayMoveButton move={choose} onPlay={closeDialog}>{t('Take this card in hand')}</PlayMoveButton></div>}
    </>
  )
}