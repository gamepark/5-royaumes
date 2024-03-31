/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Card } from '@gamepark/5-royaumes/cards/Card'
import { isKing, isKingdomTitan, isKingdomWarrior, isQueen, isSorcerer } from '@gamepark/5-royaumes/cards/CardType'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { linkButtonCss, MaterialHelpProps, Picture, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { displayLocationHelp } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Castle from '../../images/castle/castle_token.jpg'
import { DestroyButton, InfluenceButton, PlaceInCouncil, RecruitButton, RecruitTitan, TakeColor } from './buttons/CharacterCardButton'

export const CharacterCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props

  if (item.id.front === undefined) {
    return <HiddenCharacterCardHelp {...props} />
  }

  return <VisibleCharacterCardHelp {...props} />
}

export const HiddenCharacterCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  const back = item.id.back

  return (
    <>
      <h2>{getHiddenTitle(back, t)}</h2>
      <AlkaneLocation { ...props } />
      <HandLocation { ...props } />
      <CouncilLocation { ...props } />
      <TitanLocation { ...props } />
      <InfluenceLocation { ...props } />
      <TakeColor { ...props } />
      <InfluenceButton { ...props } />
    </>
  )
}

export const VisibleCharacterCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  const id = item.id.front
  const kingdom = item.id.back

  return (
    <>
      <h2>{getCardName(id, kingdom, t)}</h2>
        {getEffectDescription(id)}
      <AlkaneLocation { ...props } />
      <HandLocation { ...props } />
      <CouncilLocation { ...props } />
      <TitanLocation { ...props } />
      <InfluenceLocation { ...props } />
      <InfluenceButton { ...props } />
      <PlaceInCouncil { ...props } />
      <RecruitTitan { ...props } />
      <DestroyButton { ...props } />
    </>
  )
}

const TitanLocation: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()
  if (item.location?.type !== LocationType.PlayerTitan) return null
  return (
    <p css={italic}>{t('help.card.titan.recruit')}</p>
  )
}

const InfluenceLocation: FC<MaterialHelpProps> = ({ item }) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const itsMe = playerId && playerId === item.location?.player
  const name = usePlayerName(item.location?.player)
  if (item.location?.type !== LocationType.PlayerInfluenceZone) return null
  return (
    <p css={italic}>{t(itsMe? 'help.card.influence.you': 'help.card.influence.player', { player: name, kingdom: t(`kingdom.${item.location.id}`) })}</p>
  )
}

const AlkaneLocation: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  if (item.location?.type !== LocationType.AlkaneSquare) return null
  return (
    <>
      <p>
        <Trans defaults="help.card.alkane">
          <PlayMoveButton css={linkButtonCss} move={displayLocationHelp({ type: LocationType.AlkaneSquare })} local/>
        </Trans>
      </p>
    </>
  )
}

const HandLocation: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const playerId = usePlayerId()
  const { t } = useTranslation()
  const name = usePlayerName(item.location?.player)
  if (item.location?.type !== LocationType.PlayerHand) return null
  const itsMe = playerId === item.location.player
  return (
    <>
      <p>{t(itsMe? 'help.card.hand.you': 'help.card.hand.player', { player: name })}</p>
      <RecruitButton { ...props } />
    </>
  )
}

const CouncilLocation: FC<MaterialHelpProps> = ({ item }) => {
  const playerId = usePlayerId()
  const name = usePlayerName(item.location?.player)
  if (item.location?.type !== LocationType.Council) return null
  const itsMe = playerId === item.location.player
  return (
    <p>
      <Trans defaults={itsMe? 'help.card.concile.you': 'help.card.concile.player'} values={{ player: name }}>
        <PlayMoveButton css={linkButtonCss} move={displayLocationHelp({ type: LocationType.Council, player: item.location.player })} local />
      </Trans>
    </p>
  )
}

const getEffectDescription = (id: Card) => {
  if (isKing(id)) return <p css={alignIcon}><Trans defaults="help.card.king.effect"><strong/><Picture src={Castle}/></Trans></p>
  if (isQueen(id)) return <p css={alignIcon}><Trans defaults="help.card.queen.effect"><strong/><Picture src={Castle}/></Trans></p>
  if (isSorcerer(id)) return <p css={alignIcon}><Trans defaults="help.card.sorceress.effect"><strong/></Trans></p>
  if (isKingdomWarrior(id)) return <p css={alignIcon}><Trans defaults="help.card.warrior.effect"><strong/><Picture src={Castle}/></Trans></p>
  if (isKingdomTitan(id) || id === Card.Ouranos) return (
    <>
      <p css={alignIcon}><Trans defaults="help.card.titan.effect1"><strong/><Picture src={Castle}/></Trans></p>
      <p css={alignIcon}><Trans defaults="help.card.titan.effect2"><strong/></Trans></p>
    </>
  )
  if (id === Card.Papesse) return <p css={alignIcon}><Trans defaults="help.card.papess.effect"><strong/><Picture src={Castle}/></Trans></p>
  if (id === Card.Gaia) return (
    <>
      <p css={alignIcon}><Trans defaults="help.card.titan.effect1"><strong/><Picture src={Castle}/></Trans></p>
      <p css={alignIcon}><Trans defaults="help.card.titan.effect2"><strong/></Trans></p>
      <p css={alignIcon}><Trans defaults="help.card.gaia.effect"><strong/></Trans><Picture src={Castle}/></p>
    </>
  )
  if (id === Card.Colonel) return (
    <>
      <p css={alignIcon}><Trans defaults="help.card.colonel.effect1"><strong/><Picture src={Castle}/></Trans></p>
      <p css={alignIcon}><Trans defaults="help.card.colonel.effect2"><strong/><Picture src={Castle}/></Trans></p>
    </>
  )
  if (id === Card.Captain) return (
    <>
      <p css={alignIcon}><Trans defaults="help.card.captain.effect1"><strong/><Picture src={Castle}/></Trans></p>
      <p css={alignIcon}><Trans defaults="help.card.captain.effect2"><strong/><Picture src={Castle}/></Trans></p>
    </>
  )
  if (id === Card.WarriorMonk) return (
    <>
      <p css={alignIcon}><Trans defaults="help.card.monk.effect1"><strong/><Picture src={Castle}/></Trans></p>
      <p css={alignIcon}><Trans defaults="help.card.monk.effect2"><strong/><Picture src={Castle}/></Trans></p>
    </>
  )
  if (id === Card.Marshall) return <p css={alignIcon}><Trans defaults="help.card.marshal.effect"><strong/><Picture src={Castle}/></Trans></p>
  if (id === Card.General) return <p css={alignIcon}><Trans defaults="help.card.general.effect"><strong/></Trans></p>
  return ''
}

export const getCardName = (id: Card, kingdom: Kingdom, t: TFunction) => {
  if (isKing(id)) return t('help.card.figure', { kingdom: t(`kingdom.${kingdom}`), figure: t('help.card.king') })
  if (isQueen(id)) return t('help.card.figure', { kingdom: t(`kingdom.${kingdom}`), figure: t('help.card.queen') })
  if (isSorcerer(id)) return t('help.card.figure', { kingdom: t(`kingdom.${kingdom}`), figure: t('help.card.sorceress') })
  if (isKingdomWarrior(id)) return t('help.card.figure', { kingdom: t(`kingdom.${kingdom}`), figure: t('help.card.warrior') })
  if (isKingdomTitan(id)) return t('help.card.figure', { kingdom: t(`kingdom.${kingdom}`), figure: t('help.card.titan') })
  if (id === Card.Ouranos) return t('help.card.religious.visible', { figure: t('help.card.ouranos')})
  if (id === Card.Papesse) return t('help.card.religious.visible', { figure: t('help.card.papess')})
  if (id === Card.Gaia) return t('help.card.religious.visible', { figure: t('help.card.titan')})
  if (id === Card.Colonel) return t('help.card.colonel')
  if (id === Card.Captain) return t('help.card.captain')
  if (id === Card.WarriorMonk) return t('help.card.religious.visible', { figure: t('help.card.monk')})
  if (id === Card.Marshall) return t('help.card.marshal')
  if (id === Card.General) return t('help.card.general')
  return ''
}

const getHiddenTitle = (kingdom: Kingdom, t: TFunction) => {
  switch (kingdom) {
    case Kingdom.ImperialOrder:
      return t('help.card.imperial')
    case Kingdom.ReligiousOrder:
      return t('help.card.religious')
    default:
      return t('help.card.kingdom', { kingdom: t(`kingdom.${kingdom}`) })
  }
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

const italic = css`
  font-style: italic;
`