/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { MaterialHelpProps, Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Castle from '../../images/castle/castle_token.jpg'

export const CastleHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const playerId = usePlayerId()
  const player = item.location?.player
  const rules = useRules<FiveKingdomsRules>()!
  const castles = rules.material(MaterialType.Castle).player(player)
  const castleCount = castles.length ? (castles.getItem()!.quantity ?? 1) : 0
  const name = usePlayerName(player)
  const itsMe = !!playerId && playerId === player
  return (
    <>
      <h2>{t('help.token')}</h2>

      {!!player && (
        <p css={[alignIcon]}>
          <Trans defaults={itsMe ? 'help.token.count.you' : 'help.token.count.player'} values={{ player: name, number: castleCount }}>
            <Picture src={Castle}/>
          </Trans>
        </p>
      )}
      <p>
        {t('help.token.purpose')}
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