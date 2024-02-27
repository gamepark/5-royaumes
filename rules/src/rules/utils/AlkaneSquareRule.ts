import { Location, MaterialRulesPart } from '@gamepark/rules-api'
import uniqBy from 'lodash/uniqBy'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class AlkaneSquareRule extends MaterialRulesPart {

  get validAlkaneSquare() {
    const locations: Location[] = []
    const alkaneCards = this.alkaneCards
    for (const cardIndex of alkaneCards.getIndexes()) {
      const card = alkaneCards.getItem(cardIndex)!
      const leftX = card.location.x! - 1
      const rightX = card.location.x! + 1
      const topY = card.location.y! - 1
      const bottomY = card.location.y! + 1
      if (this.canDropToLeft(card.location.x!, card.location.y!)) {
        locations.push({
          type: LocationType.AlkaneSquare,
          x: leftX,
          y: card.location.y
        })
      }

      if (this.canDropToRight(card.location.x!, card.location.y!)) {
        locations.push({
          type: LocationType.AlkaneSquare,
          x: rightX,
          y: card.location.y
        })
      }

      if (this.canDropToTop(card.location.x!, card.location.y!)) {
        locations.push({
          type: LocationType.AlkaneSquare,
          x: card.location.x,
          y: topY
        })
      }

      if (this.canDropToBottom(card.location.x!, card.location.y!)) {
        locations.push({
          type: LocationType.AlkaneSquare,
          x: card.location.x,
          y: bottomY
        })
      }
    }

    return uniqBy(locations, (location) => `${location.x}_${location.y}`)
  }

  get minX() {
    return this.material(MaterialType.CharacterCard)
      .location(LocationType.AlkaneSquare)
      .minBy((item) => item.location.x!)
      .getItem()?.location.x
  }

  get maxX() {
    return this.material(MaterialType.CharacterCard)
      .location(LocationType.AlkaneSquare)
      .maxBy((item) => item.location.x!)
      .getItem()?.location.x
  }

  get minY() {
    return this.material(MaterialType.CharacterCard)
      .location(LocationType.AlkaneSquare)
      .minBy((item) => item.location.y!)
      .getItem()?.location.y
  }

  get maxY() {
    return this.material(MaterialType.CharacterCard)
      .location(LocationType.AlkaneSquare)
      .maxBy((item) => item.location.y!)
      .getItem()?.location.y
  }

  get alkaneCards() {
    return this
      .material(MaterialType.CharacterCard)
      .location(LocationType.AlkaneSquare)
  }

  canDropToLeft = (x: number, y: number) => {
    const maxX = this.maxX
    const minX = this.minX
    const leftX = x - 1
    return ((maxX === undefined || minX === undefined) || ((maxX - leftX) + 1 <= 3) && !this.hasCard(leftX, y))
  }

  canDropToRight = (x: number, y: number) => {
    const maxX = this.maxX
    const minX = this.minX
    const rightX = x + 1
    return ((maxX === undefined || minX === undefined) || ((rightX - minX) + 1 <= 3) && !this.hasCard(rightX, y))
  }

  canDropToTop = (x: number, y: number) => {
    const maxY = this.maxY
    const minY = this.minY
    const topY = y - 1
    return ((maxY === undefined || minY === undefined) || ((maxY - topY) + 1 <= 3) && !this.hasCard(x, topY))
  }

  canDropToBottom = (x: number, y: number) => {
    const maxY = this.maxY
    const minY = this.minY
    const bottomY = y + 1
    return ((maxY === undefined || minY === undefined) || ((bottomY - minY) + 1 <= 3) && !this.hasCard(x, bottomY))
  }

  hasCard = (x: number, y: number) => {
    return this.alkaneCards.filter((item) => item.location.x === x && item.location.y === y).length
  }

  get bannerCard() {
    return this.material(MaterialType.CharacterCard)
      .location(LocationType.BannerDeck)
      .maxBy((item) => item.location.x!)
  }
}