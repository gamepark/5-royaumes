import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { usePlayerId } from '@gamepark/react-game/dist/hooks/usePlayerId'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'
import { useResultText } from '@gamepark/react-game/dist/hooks/useResultText'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { useTranslation } from 'react-i18next'


export const GameOverHeader = () => {
  const resultText = useResultText()
  const playerId = usePlayerId()
  const { t } = useTranslation()
  const rules = useRules<FiveKingdomsRules>()!
  const iWinWithTitan = !!playerId && rules.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(playerId).length === 5
  const playerATitans = rules.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(rules.players[0]).length
  const playerBTitans = rules.material(MaterialType.CharacterCard).location(LocationType.PlayerTitan).player(rules.players[1]).length
  const winnerByTitan = playerATitans === 5? rules.players[0]: (playerBTitans === 5? rules.players[1]: undefined)
  const name = usePlayerName(winnerByTitan)
  if (iWinWithTitan) return <>{t('game.over.titan')}</>
  if (winnerByTitan) return <>{t('game.over.titan.player', { player: name })}</>

  return <>{resultText}</>
}