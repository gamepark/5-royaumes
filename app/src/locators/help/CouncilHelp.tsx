import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { linkButtonCss, LocationHelpProps, PlayMoveButton } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const CouncilHelp: FC<LocationHelpProps> = (props) => {
  const { location } = props
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('help.concile')}</h2>
      <p>
        <Trans defaults="help.concile.purpose">
          <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.ThroneCard, { id: location.player })} local />
        </Trans>
      </p>
    </>
  )
}