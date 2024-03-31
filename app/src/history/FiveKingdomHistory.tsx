/** @jsxImportSource @emotion/react */
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { CustomMoveType } from '@gamepark/5-royaumes/rules/CustomMoveType'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { MaterialHistoryProps } from '@gamepark/react-game'
import { isCreateItemType, isCustomMoveType, isMoveItemType, isStartRule, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { ActivateCardHistory } from './entry/ActivateCardHistory'
import { DestroyCardHistory } from './entry/DestroyCardHistory'
import { DiscardCardHistory } from './entry/DiscardCardHistory'
import { EndGameHistory } from './entry/EndGameHistory'
import { InfluenceHistory } from './entry/InfluenceHistory'
import { PlaceBannerCardHistory } from './entry/PlaceBannerCardHistory'
import { RecruitCardHistory } from './entry/RecruitCardHistory'
import { StealCastleHistory } from './entry/StealCastleHistory'
import { TakeBannerCardsHistory } from './entry/TakeBannerCardsHistory'
import { WinCastleHistory } from './entry/WinCastleHistory'

/**
 * history.place		FALSE	FALSE		{player} place une carte {banner} dans le carré d'Alkane
 * history.take		FALSE	FALSE		{player} récupère {number, plural, one{# carte} other{# cartes}} {banner}
 * history.recruit		FALSE	FALSE		{player} recrute {card}
 * history.influence		FALSE	FALSE		{player} gagne {number, plural, one{# influence} other{# influences}} auprès du Royaume {kingdom}
 * history.discard		FALSE	FALSE		{player} défausse {card}
 * history.effect		FALSE	FALSE		{player} active l'effet de {card}
 * history.castle		FALSE	FALSE		{player} gagne {number, plural, one{# Château} other{# Châteaux}}
 * history.refill		FALSE	FALSE		Le carré d'Alkane est reconstitué
 * history.game.end		FALSE	FALSE		La partie est terminée
 */
export const FiveKingdomHistory: FC<MaterialHistoryProps<MaterialGame, MaterialMove, Kingdom>> = (props) => {
  const { move, context } = props
  const game = context.game
  const rules = new FiveKingdomsRules(game)
  if (game.rule?.id === RuleId.DrawBannerCard
    && isMoveItemType(MaterialType.CharacterCard)(move)
    && move.location?.type === LocationType.AlkaneSquare
  ) {
    return (
      <>
        <PlaceBannerCardHistory move={move} context={context}/>
      </>
    )
  }

  if (isMoveItemType(MaterialType.CharacterCard)(move)
    && game.items[move.itemType]![move.itemIndex].location.player !== context.action.playerId
    && move.location.type === LocationType.Discard) {
    return (
      <DestroyCardHistory move={move} context={context} />
    )
  }

  if (isCustomMoveType(CustomMoveType.ActivateCharacter)(move)) {
    return (
      <ActivateCardHistory move={move} context={context} />
    )
  }

  if (
    isMoveItemType(MaterialType.CharacterCard)(move)
    && move.location?.type === LocationType.PlayerHand
    && rules.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(context.action.playerId).length === 0
  ) {
    return (
      <TakeBannerCardsHistory move={move} context={context}/>
    )
  }

  if (
    context.consequenceIndex === undefined
    && (
      isStartRule(move) && move.id === RuleId.Influence
      || (isMoveItemType(MaterialType.CharacterCard)(move) && move.location?.type === LocationType.PlayerInfluenceZone)
    )) {
    return (
      <InfluenceHistory context={context}/>
    )
  }

  if (context.consequenceIndex === undefined && isMoveItemType(MaterialType.CharacterCard)(move) && move.location?.type === LocationType.Discard && game.items[move.itemType]![move.itemIndex].location?.type !== LocationType.PlayerHand) {
    return (
      <DiscardCardHistory move={move} context={context}/>
    )
  }

  if (isMoveItemType(MaterialType.CharacterCard)(move) && (move.location?.type === LocationType.Council || move.location?.type === LocationType.PlayerTitan)) {
    return (
      <RecruitCardHistory move={move} context={context}/>
    )
  }

  if (isCreateItemType(MaterialType.Castle)(move)) {
    return (
      <WinCastleHistory move={move} context={context} />
    )
  }

  if (isMoveItemType(MaterialType.Castle)(move)) {
    return (
      <StealCastleHistory move={move} context={context} />
    )
  }

  if (isStartRule(move) && move.id === RuleId.EndGame) {
    return (
      <EndGameHistory />
    )
  }

  return <></>
}