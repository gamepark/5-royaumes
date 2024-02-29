/** @jsxImportSource @emotion/react */
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import RaptorThrone from '../../images/throne/raptor_throne.jpg'
import FelineThrone from '../../images/throne/feline_throne.jpg'
import SailorThrone from '../../images/throne/sailor_throne.jpg'
import ReptileThrone from '../../images/throne/reptile_throne.jpg'
import ThroneBack from '../../images/throne/throne_back.jpg'
import UrsidsThrone from '../../images/throne/ursids_throne.jpg'

export class ThroneCardDescription extends CardDescription {
  borderRadius = 0.5

  getStaticItems(_context: MaterialContext) {
    const items = []
    for (const player of _context.rules.players) {
      items.push({
        id: player,
        location: {
          type: LocationType.PlayerThrone
        }
      })
    }

    return items
  }

  backImage = ThroneBack
  images = {
    [Kingdom.Reptile]: ReptileThrone,
    [Kingdom.Feline]: FelineThrone,
    [Kingdom.Raptor]: RaptorThrone,
    [Kingdom.Ursid]: UrsidsThrone,
    [Kingdom.Sailor]: SailorThrone,
  }

}

export const throneCardDescription = new ThroneCardDescription()