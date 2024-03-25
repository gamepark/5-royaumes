import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { isLocationSubset, LocationHelpProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const AlkaneSquareHelp: FC<LocationHelpProps> = (props) => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('help.alkane')}</h2>
      <p>
        {t('help.alkane.purpose')}
      </p>
      <PlaceBannerCard {...props }/>
    </>
  )
}

export const PlaceBannerCard: FC<LocationHelpProps> = (props) => {
  const { closeDialog, location } = props
  const { t } = useTranslation()
  const move = useLegalMove((move) => isMoveItemType(MaterialType.CharacterCard)(move) && isLocationSubset(move.location, location))
  if (!move) return null
  return (
    <p>
      <PlayMoveButton move={move} onPlay={closeDialog}>
        {t('move.card.alkane')}
      </PlayMoveButton>
    </p>
  )
}