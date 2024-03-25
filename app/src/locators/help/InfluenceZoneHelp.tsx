/** @jsxImportSource @emotion/react */
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { isLocationSubset, LocationHelpProps, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const InfluenceZoneHelp: FC<LocationHelpProps> = ({ location }) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<FiveKingdomsRules>()!
  const itsMe = playerId === location.player
  const kingdom = location.id
  const name = usePlayerName(location.player)
  const count = rules.material(MaterialType.CharacterCard).location((l) => isLocationSubset(l, location)).length
  return <>
    <h2>{t('help.influence')}</h2>
    <p>
      {t(itsMe ? 'help.influence.you' : 'help.influence.player', { player: name, kingdom: t(`player.${kingdom}`), number: count })}
    </p>
  </>
}