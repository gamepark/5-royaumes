/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Castle from '../../images/castle/castle_token.jpg'

export const ThroneCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  return (
    <>
      <h2>{t('help.throne')}</h2>
      <p css={[alignIcon]}>
        <Trans defaults="help.throne.effect" values={{ kingdom: t(`player.${item.id}`)}}>
          <Picture src={Castle} />
        </Trans>
      </p>
    </>
  )
}

const alignIcon = css`
  > picture {
    vertical-align: middle;
  }

  picture, img {
    vertical-align: middle;
    height: 1.5em;
    margin-right: 0.1em;
    border-radius: 5em;
  }
`