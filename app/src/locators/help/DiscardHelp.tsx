/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { LocationHelpProps, MaterialComponent, pointerCursorCss, usePlay, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const DiscardHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const cards = useRules<FiveKingdomsRules>()?.material(MaterialType.CharacterCard).location(LocationType.Discard).player(location.player)
    .sort(item => -item.location.x!)
  const play = usePlay()
  return <>
    <h2>{t('help.discard')}</h2>
    <p>
      {t('help.discard.count', { number: cards?.length })}
    </p>
    <ol css={grid}>
      {cards?.entries.map(([index, card]) =>
        <li key={index}>
          <MaterialComponent
            type={MaterialType.CharacterCard}
            itemId={card.id}
            css={pointerCursorCss}
            onClick={() => play(displayMaterialHelp(MaterialType.CharacterCard, card, index), { local: true })}
          />
        </li>
      )}
    </ol>
  </>
}

const grid = css`
  display: grid;
  grid-template-columns: auto auto auto;
  list-style-type: none;
  gap: 1em;
  padding: 0 0.5em 0.5em 0;
  margin: 0;
  font-size: 1.5em;
`