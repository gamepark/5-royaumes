/** @jsxImportSource @emotion/react */
import { Card } from '@gamepark/5-royaumes/cards/Card'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { linkButtonCss, PlayMoveButton, useRules } from '@gamepark/react-game'
import { displayMaterialHelp } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const BannerDeckHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<FiveKingdomsRules>()!
  const count = rules.material(MaterialType.CharacterCard).location(LocationType.BannerDeck).length
  return (
    <>
      <h2>{t('help.deck')}</h2>
      <p>{t('help.deck.count', { number: count })}</p>
      <p>
        {t('help.list')}
      </p>
      <div>
        {t('help.list.kingdoms')}
        <ul>
          <CardCount card={Card.Feline1} name={t('help.card.king')} />
          <CardCount card={Card.Raptor2} name={t('help.card.queen')} />
          <CardCount card={Card.Ursid3} name={t('help.card.sorceress')} />
          <CardCount card={Card.Sailor4} name={t('help.card.warrior')} />
          <CardCount card={Card.Reptile5} name={t('help.card.titan')} />
        </ul>
      </div>
      <div>
        {t('help.list.religious')}
        <ul>
          <CardCount card={Card.Papesse} name={t('help.card.papess')} />
          <CardCount card={Card.WarriorMonk} name={t('help.card.monk')} />
          <CardCount card={Card.Gaia} name={t('help.card.gaia')} />
          <CardCount card={Card.Ouranos} name={t('help.card.ouranos')} />
        </ul>
      </div>
      <div>
        {t('help.list.imperial')}
        <ul>
          <CardCount card={Card.Colonel} name={t('help.card.colonel')} />
          <CardCount card={Card.General} name={t('help.card.general')} />
          <CardCount card={Card.Captain} name={t('help.card.captain')} />
          <CardCount card={Card.Marshall} name={t('help.card.marshal')} />
        </ul>
      </div>
    </>
  )
}

const CardCount: FC<{ card: Card, name: string }> = ({ card, name }) => {
  const { t } = useTranslation()
  const displayCard = (card: Card) => {
    return displayMaterialHelp(MaterialType.CharacterCard, { id: { front: card }})
  }

  return <li>{t('help.list.count', { name: <PlayMoveButton key="display" css={linkButtonCss} move={displayCard(card)} local>{name}</PlayMoveButton> })}</li>
}