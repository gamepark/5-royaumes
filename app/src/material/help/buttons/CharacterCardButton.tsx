/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { isLocationSubset, MaterialComponent, MaterialHelpProps, PlayMoveButton, useLegalMove, useLegalMoves, usePlay, useRules } from '@gamepark/react-game'
import { isMoveItemType, isStartRule, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import FelineIcon from '../../../images/icons/feline.png'
import RaptorIcon from '../../../images/icons/raptor.png'
import ReptileIcon from '../../../images/icons/reptile.png'
import SailorIcon from '../../../images/icons/sailor.png'
import UrsidIcon from '../../../images/icons/ursids.png'
const displayLocationHelp = MaterialMoveBuilder.displayLocationHelp
const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const PlaceInCouncil: FC<MaterialHelpProps> = ({ item, itemIndex, closeDialog }) => {
  const rules = useRules<FiveKingdomsRules>()!
  const play = usePlay()
  const { t } = useTranslation()
  const council = rules.material(MaterialType.CharacterCard).location(LocationType.Council).player(rules.game?.rule?.player ?? item.location?.player)
  const moves = useLegalMoves<MoveItem>((move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.location?.type === LocationType.Council && move.itemIndex === itemIndex)
  if (!moves.length) return null
  if (council.length < 4) {
    return (
      <p>
        <PlayMoveButton move={moves[0]} onPlay={closeDialog}>
          {t('move.card.council')}
        </PlayMoveButton>
      </p>
    )
  }

  return (
    <>
      <span css={recruitmentText}>{t('move.recruitment')}</span>
      <div css={replaceGrid}>
        {moves.map((m) => {
          const existingItem = rules.material(MaterialType.CharacterCard).location((location) => isLocationSubset(m.location, location)).getItem()!
          return (
            <div key={m.location.x!} css={replaceItemCss}>
              <MaterialComponent css={character} type={MaterialType.CharacterCard} itemId={existingItem.id.front} onClick={() => play(displayMaterialHelp(MaterialType.CharacterCard, { id: existingItem.id}), { local: true })}/>
              <PlayMoveButton move={m} onPlay={closeDialog}>
                {t('move.card.replace')}
              </PlayMoveButton>
            </div>
          )
        })}
      </div>
    </>
  )
}

export const TakeColor: FC<MaterialHelpProps> = ({ closeDialog, itemIndex }) => {
  const { t } = useTranslation()
  const move = useLegalMove((move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.location?.type === LocationType.PlayerHand && move.itemIndex === itemIndex)
  if (!move) return null
  return (
    <p>
      <PlayMoveButton move={move} onPlay={closeDialog}>
        {t('move.card.choose-banner')}
      </PlayMoveButton>
    </p>
  )
}

export const InfluenceButton: FC<MaterialHelpProps> = ({ closeDialog, itemIndex }) => {
  const { t } = useTranslation()
  const moves = useLegalMoves((move) =>
    (isStartRule(move) && move.id === RuleId.Influence) ||
    (isMoveItemType(MaterialType.CharacterCard)(move) && move.location?.type === LocationType.PlayerInfluenceZone && move.itemIndex === itemIndex ))
  if (!moves.length) return null
  if (moves.some((move) => isStartRule(move) && move.id === RuleId.Influence)) {
    return (
      <PlayMoveButton move={moves[0]} onPlay={closeDialog}>
        {t('move.card.influence')}
      </PlayMoveButton>
    )
  }

  return (
    <p>
      {moves
        .map((move) => {
          return (
            <PlayMoveButton css={influenceButton} key={JSON.stringify(move)} move={move} onPlay={closeDialog}>
              <div css={iconAndText}><KingdomIcon kingdom={move.location.id}/> {t('move.card.influence')}</div>
            </PlayMoveButton>
          )
        })}
    </p>
  )
}

export const DestroyButton: FC<MaterialHelpProps> = ({ closeDialog, itemIndex }) => {
  const { t } = useTranslation()
  const move = useLegalMove((move) =>
    (isMoveItemType(MaterialType.CharacterCard)(move) && move.location?.type === LocationType.Discard && move.itemIndex === itemIndex))
  if (!move) return null
  return (
    <p>
      <PlayMoveButton move={move} onPlay={closeDialog}>
        {t('move.card.destroy')}
      </PlayMoveButton>
    </p>
  )
}

export const RecruitButton: FC<MaterialHelpProps> = ({ closeDialog }) => {
  const { t } = useTranslation()
  const move = useLegalMove((move) => isStartRule(move) && move.id === RuleId.Recruit)
  if (!move) return null
  return (
    <p>
      <PlayMoveButton move={move} onPlay={closeDialog}>
        {t('move.card.recruit')}
      </PlayMoveButton>
    </p>
  )
}

export const GoBackToBannerDeckButton: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()
  const { location } = item
  if (location?.type !== LocationType.Help) return null
  return (
    <p>
      <PlayMoveButton move={displayLocationHelp({ type: LocationType.BannerDeck })}>
        {t('move.return.banner')}
      </PlayMoveButton>
    </p>
  )
}

export const RecruitTitan: FC<MaterialHelpProps> = ({ closeDialog, itemIndex }) => {
  const { t } = useTranslation()
  const move = useLegalMove((move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.location?.type === LocationType.PlayerTitan && move.itemIndex === itemIndex)
  if (!move) return null
  return (
    <p>
      <PlayMoveButton move={move} onPlay={closeDialog}>
        {t('move.card.titan')}
      </PlayMoveButton>
    </p>
  )
}

const KingdomIcon: FC<{ kingdom: Kingdom }> = ({ kingdom }) => {
  return (
    <div css={iconCss(kingdom)} />
  )
}

const iconCss = (kingdom: Kingdom) => css`
  background-image: url(${icons[kingdom]});
  background-position: center;
  background-size: contain;
  height: 1.2em;
  width: 1.2em;
  margin-left: -0.3em;
  margin-right: 0.2em;
  background-repeat: no-repeat;
`

const iconAndText = css`
  display: flex;
  align-items: center;
`


const icons = {
  [Kingdom.Reptile]: ReptileIcon,
  [Kingdom.Feline]: FelineIcon,
  [Kingdom.Raptor]: RaptorIcon,
  [Kingdom.Ursid]: UrsidIcon,
  [Kingdom.Sailor]: SailorIcon
}

const replaceItemCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
  margin: 0.3em
`

const replaceGrid = css`
  display: flex;
`

const recruitmentText = css`
  font-weight: bold;
  text-decoration: underline;
`

const character = css`
  cursor: pointer;
  font-size: 0.8em;
`

const influenceButton = css`
  margin-right: 0.5em;
  margin-bottom: 0.5em;
`
