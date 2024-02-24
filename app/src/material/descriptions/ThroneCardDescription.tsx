/** @jsxImportSource @emotion/react */
import { Realm } from '@gamepark/5-royaumes/cards/Realm'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import ThroneBack from '../../images/throne/throne_back.jpg'
import ReptileThrone from '../../images/throne/reptile_throne.jpg'
import FelineThrone from '../../images/throne/feline_throne.jpg'
import BordOfPreyThrone from '../../images/throne/bird_of_prey_throne.jpg'
import UrsidsThrone from '../../images/throne/ursids_throne.jpg'
import MarineThrone from '../../images/throne/marine_throne.jpg'
export class ThroneCardDescription extends CardDescription {
  borderRadius = 0.5

  getStaticItems(_context: MaterialContext<number, number, number>): MaterialItem<number, number>[] {
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
    [Realm.Reptile]: ReptileThrone,
    [Realm.Feline]: FelineThrone,
    [Realm.BirdOfPrey]: BordOfPreyThrone,
    [Realm.Ursid]: UrsidsThrone,
    [Realm.Marine]: MarineThrone,
  }

}

export const throneCardDescription = new ThroneCardDescription()