/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Card } from '@gamepark/5-royaumes/cards/Card'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { linkButtonCss, PlayMoveButton, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const BannerDeckHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<FiveKingdomsRules>()!
  const count = rules.material(MaterialType.CharacterCard).location(LocationType.BannerDeck).length
  return (
    <div css={css`min-width: 50dvw`}>
      <h2>{t('help.deck')}</h2>
      <p>{t('help.deck.count', { number: count })}</p>
      <p>
        {t('help.list')}
      </p>
      <div>
        {t('help.list.kingdoms')}
        <ul>
          <CardCount card={Card.Feline1} kingdom={Kingdom.Feline} name={t('help.card.king')} />
          <CardCount card={Card.Raptor2} kingdom={Kingdom.Raptor} name={t('help.card.queen')} />
          <CardCount card={Card.Ursid3} kingdom={Kingdom.Ursid} name={t('help.card.sorceress')} />
          <CardCount card={Card.Sailor4} kingdom={Kingdom.Sailor} name={t('help.card.warrior')} />
          <CardCount card={Card.Reptile5} kingdom={Kingdom.Reptile} name={t('help.card.titan')} />
        </ul>
      </div>
      <div>
        {t('help.list.religious')}
        <ul>
          <CardCount card={Card.Papesse} kingdom={Kingdom.ReligiousOrder} name={t('help.card.papess')} />
          <CardCount card={Card.WarriorMonk} kingdom={Kingdom.ReligiousOrder} name={t('help.card.monk')} />
          <CardCount card={Card.Gaia} kingdom={Kingdom.ReligiousOrder} name={t('help.card.gaia')} />
          <CardCount card={Card.Ouranos} kingdom={Kingdom.ReligiousOrder} name={t('help.card.ouranos')} />
        </ul>
      </div>
      <div>
        {t('help.list.imperial')}
        <ul>
          <CardCount card={Card.Colonel} kingdom={Kingdom.ImperialOrder} name={t('help.card.colonel')} />
          <CardCount card={Card.General}  kingdom={Kingdom.ImperialOrder} name={t('help.card.general')} />
          <CardCount card={Card.Captain}  kingdom={Kingdom.ImperialOrder} name={t('help.card.captain')} />
          <CardCount card={Card.Marshall} kingdom={Kingdom.ImperialOrder} name={t('help.card.marshal')} />
        </ul>
      </div>
    </div>
  )
}

const CardCount: FC<{ card: Card, kingdom: Kingdom, name: string }> = ({ card, kingdom, name }) => {
  const { t } = useTranslation()
  return <li>{t('help.list.count', { name: <PlayMoveButton key="display" css={linkButtonCss} move={displayMaterialHelp(MaterialType.CharacterCard, { id: { front: card, back: kingdom }, location: { type: LocationType.Help }})} local>{name}</PlayMoveButton> })}</li>
}