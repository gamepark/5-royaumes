/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { baseKingdoms, Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { Player, useOptions } from '@gamepark/react-client'
import { Avatar, Picture, PlayerTimer, SpeechBubbleDirection, useFocusContext, usePlayerName, useRules } from '@gamepark/react-game'
import { GameSpeed } from '@gamepark/rules-api'
import { FC, HTMLAttributes, useCallback } from 'react'
import Castle from '../images/castle/castle_token.jpg'
import FelineThrone from '../images/throne/feline_throne.jpg'
import RaptorThrone from '../images/throne/raptor_throne.jpg'
import ReptileThrone from '../images/throne/reptile_throne.jpg'
import SailorThrone from '../images/throne/sailor_throne.jpg'
import UrsidsThrone from '../images/throne/ursids_throne.jpg'

type FarawayPlayerPanelProps = {
  player: Player
} & HTMLAttributes<HTMLDivElement>

export const FiveKingdomPlayerPanel: FC<FarawayPlayerPanelProps> = (props) => {
  const { player, ...rest } = props
  const { setFocus } = useFocusContext()
  const rules = useRules<FiveKingdomsRules>()!
  const playerName = usePlayerName(player.id)
  const focusPlayer = useCallback(() => {
    setFocus({
      materials: [
        rules.material(MaterialType.CharacterCard).location(LocationType.PlayerHand)
      ],
      staticItems: [],
      locations: [
        ...baseKingdoms
          .map(id => ({
            type: LocationType.PlayerInfluenceZone,
            player: player.id,
            id: id
          })),
        ...Array.from(Array(4))
          .map((_, x) => ({
            type: LocationType.Council,
            player: player.id,
            x
          }))
      ],
      margin: {
        right: 1,
        left: 1
      },
      animationTime: 500
    })
  }, [rules, player, setFocus])
  return (
    <>
      <div css={[panelPlayerStyle, panelStyle(player.id)]} onClick={focusPlayer} {...rest}>
        <Avatar css={avatarStyle} playerId={player.id} speechBubbleProps={{ direction: SpeechBubbleDirection.BOTTOM_LEFT }}/>
        <h2 css={[nameStyle, data]}>{playerName}</h2>
        <Timer {...props} />
        <PlacedCard {...props} />
        <Score {...props} />
      </div>

    </>
  )
}

const Timer: FC<FarawayPlayerPanelProps> = (props) => {
  const { player } = props
  const rules = useRules<FiveKingdomsRules>()!

  if (rules?.isOver()) return null

  return <PlayerTimer customStyle={[(playing) => !playing && css`color: lightgray !important;`]} playerId={player.id} css={[timerStyle, data]}/>
}

const Score: FC<FarawayPlayerPanelProps> = () => {
  const rules = useRules<FiveKingdomsRules>()!

  if (!rules?.isOver()) return null
  return (
    <span css={[placedCard, data]}>
      <FontAwesomeIcon icon={faStar} css={scoreStyle} fill="#28B8CE"/>
      <span>{1111}</span>
    </span>
  )
}

const PlacedCard: FC<FarawayPlayerPanelProps> = (props) => {
  const { player } = props
  const rules = useRules<FiveKingdomsRules>()!
  const castles = rules.material(MaterialType.Castle).player(player.id).getItem()
  const castleCount = castles !== undefined? (castles.quantity ?? 1): 0
  const options = useOptions()
  const speedDisabled = options?.speed !== GameSpeed.RealTime || !player?.time


  return (
    <span css={[data, placedCard, speedDisabled && rightAlignment]}>
      <Picture css={timeMini} src={Castle}/>
      <span>{castleCount}</span>
    </span>
  )
}

const rightAlignment = css`
  bottom: 0.2em;
  left: initial;
  right: 0.25em;
  font-size: 2.5em;
`
const timeMini = css`
  height: 1.05em;
  margin-bottom: -0.17em;
  border: 0.01em solid white;
  border-radius: 5em;
`

const placedCard = css`
  position: absolute;
  width: 3.5em;
  font-size: 2.5em;
  bottom: 0.2em;
  left: initial;
  right: 0.25em;
  display: flex;
  height: 1.35em;

  > span {
    text-align: right;
    width: 1.7em;
  }
`

const scoreStyle = css`
  color: #28B8CE
`

const panelPlayerStyle = css`
  color: black;
  border-radius: 3em 1.5em 1.5em 1.5em;
  box-shadow: 0 0 0.5em black, 0 0 0.5em black;
`

const avatarStyle = css`
  position: absolute;
  top: -0.1em;
  left: 0;
  border-radius: 100%;
  height: 6em;
  width: 6em;
  color: black;
  z-index: 1;
`
const nameStyle = css`
  position: absolute;
  top: 0.3em;
  left: initial;
  right: 0.3em;
  max-width: 7.3em;
  font-size: 2.4em;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const PlayerBackground = [
  ReptileThrone,
  FelineThrone,
  RaptorThrone,
  UrsidsThrone,
  SailorThrone
]

const panelStyle = (playerId: Kingdom) => css`
  cursor: pointer;

  background: rgba(0, 0, 0, 0.8) url(${PlayerBackground[playerId - 1]}) no-repeat -5em -17em;
    background-size: 120% auto;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    left: 0;
    border-radius: 1em;
    //background-color: rgba(255, 255, 255, 0.3);
  }
`

const data = css`
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.1em 0.3em;
  border-radius: 0.4em;
  z-index: 2;
`

const timerStyle = css`
  position: absolute;
  bottom: 0.2em;
  left: initial;
  right: 4.1em;
  font-size: 2.5em;
`