/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { characterCardDescription } from '../material/descriptions/CharacterCardDescription'
import { DiscardDescription } from './description/DiscardDescription'

export class DiscardLocator extends DeckLocator {

  locationDescription = new DiscardDescription()


  delta = { x: -0.03, y: -0.04}

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const coordinates = { ...this.locationDescription.coordinates, z: 0.05}
    if (item.selected) {
      const { rules } = context
      const topDiscardCard = rules.material(MaterialType.CharacterCard).location(LocationType.Discard).maxBy((item) => item.location.x!)
      const x = topDiscardCard.getItem()?.location.x
      coordinates.y -= (characterCardDescription.height + 0.4 + (Math.min(x ?? 0, 19) * 0.03))
      coordinates.z += 10
    }

    return coordinates
  }

}

export const discardLocator = new DiscardLocator()