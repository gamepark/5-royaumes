/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { baseKingdoms } from '@gamepark/5-royaumes/cards/Kingdom'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { Player } from '@gamepark/react-client'
import { StyledPlayerPanel, useRules } from '@gamepark/react-game'
import { FC, HTMLAttributes, useMemo } from 'react'
import Castle from '../images/castle/castle_token.jpg'
import FelineThrone from '../images/throne/feline_throne.jpg'
import RaptorThrone from '../images/throne/raptor_throne.jpg'
import ReptileThrone from '../images/throne/reptile_throne.jpg'
import SailorThrone from '../images/throne/sailor_throne.jpg'
import UrsidsThrone from '../images/throne/ursids_throne.jpg'

type FiveKingdomPlayerPanelProps = {
  player: Player
} & HTMLAttributes<HTMLDivElement>

export const FiveKingdomPlayerPanel: FC<FiveKingdomPlayerPanelProps> = (props) => {
  const { player, ...rest } = props
  const rules = useRules<FiveKingdomsRules>()!
  const castles = rules.material(MaterialType.Castle).player(player.id).getItem()
  const castleCount = castles !== undefined? (castles.quantity ?? 1): 0
  const playerFocus = useMemo(() => ({
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
  }), [rules, player])
  return (
    <StyledPlayerPanel
      player={player}
      playerFocus={playerFocus}
      backgroundImage={PlayerBackground[player.id - 1]}
      css={[backgroundPosition]}
      mainCounter={{ image: Castle, value: castleCount, imageCss: css`border-radius: 5em;` }}
      { ...rest }
    />
  )
}

const PlayerBackground = [
  ReptileThrone,
  FelineThrone,
  RaptorThrone,
  UrsidsThrone,
  SailorThrone
]

const backgroundPosition = css`
  background-position: -5em -17em;
  background-size: 120% auto;
`