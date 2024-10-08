/** @jsxImportSource @emotion/react */
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import RaptorThrone from '../../images/throne/raptor_throne.jpg'
import FelineThrone from '../../images/throne/feline_throne.jpg'
import SailorThrone from '../../images/throne/sailor_throne.jpg'
import ReptileThrone from '../../images/throne/reptile_throne.jpg'
import UrsidsThrone from '../../images/throne/ursids_throne.jpg'
import ThroneBack from '../../images/throne/throne_back.jpg'
import TitanIcon from '../../images/icons/titan.png'
import ReptileIcon from '../../images/icons/reptile.png'
import FelineIcon from '../../images/icons/feline.png'
import RaptorIcon from '../../images/icons/raptor.png'
import UrsidIcon from '../../images/icons/ursids.png'
import SailorIcon from '../../images/icons/sailor.png'
import ReligiousIcon from '../../images/icons/religious.png'
import ImperialIcon from '../../images/icons/imperial.png'
import { ThroneCardHelp } from '../help/ThroneCardHelp'

export class ThroneCardDescription extends CardDescription {
  borderRadius = 0.5

  getStaticItems(_context: MaterialContext) {
    const items = []
    for (const player of _context.rules.players) {
      items.push({
        id: player,
        location: {
          type: LocationType.PlayerThrone,
          player: player
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

  getImages(): string[] {
    const images = super.getImages()
    images.push(TitanIcon)
    images.push(ReptileIcon)
    images.push(FelineIcon)
    images.push(RaptorIcon)
    images.push(UrsidIcon)
    images.push(SailorIcon)
    images.push(ReligiousIcon)
    images.push(ImperialIcon)
    return images
  }

  help = ThroneCardHelp

}

export const throneCardDescription = new ThroneCardDescription()