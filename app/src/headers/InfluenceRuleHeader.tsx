/** @jsxImportSource @emotion/react */
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const InfluenceRuleHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<FiveKingdomsRules>()!
  const playerId = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const hand = rules.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(activePlayer)
  const hasImperial = hand.getItems().some((item) => item.id.back === Kingdom.ImperialOrder)
  const name = usePlayerName(activePlayer)
  const itsMe = activePlayer === playerId

  if (!hasImperial) {
    return (
      <>{t(itsMe? 'header.influence.you': 'header.influence.player', { player: name, kingdom: t(`player.${hand.getItem()!.id.back}`) })}</>
    )
  }

  if (itsMe) {
    return (
      <>{t('header.influence.imperial.you', { number: hand.length })}</>
    )
  }

  return (
    <>{t('header.influence.imperial.player', { number: hand.length, player: name })}</>
  )
}
