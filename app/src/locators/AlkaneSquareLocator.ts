/** @jsxImportSource @emotion/react */
import { Memory } from '@gamepark/5-royaumes/rules/Memory'
import { RefillAlkaneRule } from '@gamepark/5-royaumes/rules/RefillAlkaneRule'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { AlkaneSquareRule } from '@gamepark/5-royaumes/rules/utils/AlkaneSquareRule'
import { LocationContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialGame, MaterialRules } from '@gamepark/rules-api'
import { characterCardDescription } from '../material/descriptions/CharacterCardDescription'
import { AlkaneSquareDescription } from './description/AlkaneSquareDescription'

export class AlkaneSquareLocator extends Locator {

  locationDescription = new AlkaneSquareDescription()

  game?: MaterialGame
  deltaX = 0
  deltaY = 0

  getCoordinates(location: Location, context: LocationContext): Coordinates {
    if (location.x === undefined && location.y === undefined) return { x: -34.5, y: -10, z: 0 }
    const { rules } = context
    if (rules.game !== this.game) {
      this.refreshDeltaPosition(rules)
      this.game = rules.game
    }
    const baseX = -41
    const baseY = -19
    const computedX = location.x! - (this.deltaX ?? 0)
    const computedY = location.y! - (this.deltaY ?? 0)
    return {
      x: baseX + (computedX * (characterCardDescription.width + 0.2)),
      y: baseY + (computedY * (characterCardDescription.height + 0.2)),
      z: 0.05
    }
  }

  refreshDeltaPosition(rules: MaterialRules) {
    if (rules.game.rule?.id === RuleId.RefillAlkane) {
      const alkaneCards = new RefillAlkaneRule(rules.game).alkaneCards
      if (alkaneCards.length === 1) {
        this.deltaX = alkaneCards.getItem()!.location.x! - 1
        this.deltaY = alkaneCards.getItem()!.location.y!
      }
    } else if (this.isPlaceBannerCard(rules) || !this.game) {
      const alkaneRule = new AlkaneSquareRule(rules.game)
      const { minX, minY, maxX, maxY } = alkaneRule
      if (minX !== undefined && minX < this.deltaX) this.deltaX = minX
      else if (maxX !== undefined && maxX > this.deltaX + 2) this.deltaX = maxX - 2
      if (minY !== undefined && minY < this.deltaY) this.deltaY = minY
      else if (maxY !== undefined && maxY > this.deltaY + 2) this.deltaY = maxY - 2

      if (this.isPlaceBannerCard(rules)) {
        if (maxX! - minX! < 2) {
          if (this.deltaX === minX) this.deltaX -= 0.5
          else if (this.deltaX === maxX! - 2) this.deltaX += 0.5
        }

        if (maxY! - minY! < 2) {
          if (this.deltaY === minY) this.deltaY -= 0.5
          else if (this.deltaY === maxY! - 2) this.deltaY += 0.5
        }
      }
    }
  }

  getLocations({ rules, player }: MaterialContext) {
    if (this.isPlaceBannerCard(rules) && player === rules.getActivePlayer()) {
      return new AlkaneSquareRule(rules.game).validAlkaneSquare
    }

    return []
  }

  isPlaceBannerCard(rules: MaterialRules) {
    return rules.game.rule?.id === RuleId.DrawBannerCard && rules.remind(Memory.PlacedCard) === undefined
  }
}

export const alkaneSquareLocator = new AlkaneSquareLocator()