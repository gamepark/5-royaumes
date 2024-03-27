/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { isLocationSubset, MaterialComponent, MaterialHelpProps, PlayMoveButton, useLegalMove, useLegalMoves, useRules } from '@gamepark/react-game'
import { isMoveItemType, isStartRule, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const PlaceInCouncil: FC<MaterialHelpProps> = ({ item, itemIndex, closeDialog }) => {
  const rules = useRules<FiveKingdomsRules>()!
  const { t } = useTranslation()
  const council = rules.material(MaterialType.CharacterCard).location(LocationType.Council).player(rules.game?.rule?.player ?? item.location?.player)
  const moves = useLegalMoves<MoveItem>((move) => isMoveItemType(MaterialType.CharacterCard, itemIndex)(move) && move.location.type === LocationType.Council)
  if (item.location?.type === LocationType.Discard && !item.selected) return null
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
    <div css={css`display: grid; grid-template-columns: 1fr 1fr`}>
      {moves.map((m) => {
        const existingItem = rules.material(MaterialType.CharacterCard).location((location) => isLocationSubset(m.location, location)).getItem()!
        return (
          <div key={m.location.x!} css={css`display: flex; flex-direction: column; align-items: center; gap: 0.5em; margin: 0.5em`}>
            <MaterialComponent type={MaterialType.CharacterCard} itemId={existingItem.id.front}/>
            <PlayMoveButton move={m} onPlay={closeDialog}>
              {t('move.card.replace')}
            </PlayMoveButton>
          </div>
        )
      })}
    </div>
  )
}

export const SelectCardButton: FC<MaterialHelpProps> = ({ item, itemIndex, closeDialog }) => {
  const rules = useRules<FiveKingdomsRules>()!
  const { t } = useTranslation()
  const moves = useLegalMoves<MoveItem>((move) => isMoveItemType(MaterialType.CharacterCard, itemIndex)(move) && move.location?.type === LocationType.Council || move.location?.type === LocationType.PlayerInfluenceZone)
  if (!moves.length || item.location?.type !== LocationType.Discard || item.selected) return null
  return (
    <p>
      <PlayMoveButton move={rules.material(MaterialType.CharacterCard).index(itemIndex!).selectItem()} local onPlay={closeDialog}>
        {t('move.card.take')}
      </PlayMoveButton>
    </p>
  )
}

export const TakeColor: FC<MaterialHelpProps> = ({ closeDialog, itemIndex }) => {
  const { t } = useTranslation()
  const move = useLegalMove((move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.location.type === LocationType.PlayerHand && move.itemIndex === itemIndex)
  if (!move) return null
  return (
    <p>
      <PlayMoveButton move={move} onPlay={closeDialog}>
        {t('move.card.choose-banner')}
      </PlayMoveButton>
    </p>
  )
}

export const InfluenceButton: FC<MaterialHelpProps> = ({ closeDialog, item, itemIndex }) => {
  const { t } = useTranslation()
  const move = useLegalMove((move) =>
    (isStartRule(move) && move.id === RuleId.Influence) ||
    (isMoveItemType(MaterialType.CharacterCard)(move) && move.location.type === LocationType.PlayerInfluenceZone && move.itemIndex === itemIndex))
  if (!move) return null

  if (item.location?.type === LocationType.Discard && !item.selected) return null
  return (
    <p>
      <PlayMoveButton move={move} onPlay={closeDialog}>
        {t('move.card.influence')}
      </PlayMoveButton>
    </p>
  )
}

export const DestroyButton: FC<MaterialHelpProps> = ({ closeDialog, item, itemIndex }) => {
  const { t } = useTranslation()
  const move = useLegalMove((move) =>
    (isMoveItemType(MaterialType.CharacterCard)(move) && move.location.type === LocationType.Discard && move.itemIndex === itemIndex))
  if (!move) return null
  if (item.location?.type !== LocationType.PlayerThrone) return null
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

export const RecruitTitan: FC<MaterialHelpProps> = ({ closeDialog, item, itemIndex }) => {
  const { t } = useTranslation()
  const move = useLegalMove((move) => isMoveItemType(MaterialType.CharacterCard, itemIndex)(move) && move.location.type === LocationType.PlayerTitan)

  if (item.location?.type === LocationType.Discard && !item.selected) return null
  if (!move) return null
  return (
    <p>
      <PlayMoveButton move={move} onPlay={closeDialog}>
        {t('move.card.titan')}
      </PlayMoveButton>
    </p>
  )
}