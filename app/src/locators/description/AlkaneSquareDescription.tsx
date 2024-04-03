/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { Memory } from '@gamepark/5-royaumes/rules/Memory'
import { RefillAlkaneRule } from '@gamepark/5-royaumes/rules/RefillAlkaneRule'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { AlkaneSquareRule } from '@gamepark/5-royaumes/rules/utils/AlkaneSquareRule'
import { ComponentSize, LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialGame, MaterialMove, MaterialRules } from '@gamepark/rules-api'
import { characterCardDescription } from '../../material/descriptions/CharacterCardDescription'
import { AlkaneSquareHelp } from '../help/AlkaneSquareHelp'

export class AlkaneSquareDescription extends LocationDescription {
  width = 6.35
  height = 8.89
  borderRadius = 0.5

  getSize(location: Location, context: MaterialContext): ComponentSize {
    if (location.x !== undefined && location.y !== undefined) return super.getSize(location, context)
    return {
      width: this.width * 3.4,
      height: this.height * 3.3
    }
  }

  isAlwaysVisible(location: Location, _context: MaterialContext) {
    return location.x !== undefined && location.y !== undefined

  }

  getExtraCss(location: Location, context: MaterialContext) {
    const extra = super.getExtraCss(location, context)
    if (location.x === undefined && location.y === undefined) return [alkaneSquareCss]
    return extra
  }

  extraCss = css`
    border: 0.05em solid white;
  `

  help = AlkaneSquareHelp

  game?: MaterialGame
  deltaX = 0
  deltaY = 0

  isPlaceBannerCard(rules: MaterialRules) {
    return rules.game.rule?.id === RuleId.DrawBannerCard && rules.remind(Memory.PlacedCard) === undefined
  }

  getLocations({ rules }: MaterialContext) {
    return [
      { type: LocationType.AlkaneSquare },
      ...(this.isPlaceBannerCard(rules) ? new AlkaneSquareRule(rules.game).validAlkaneSquare : [])
    ]
  }

  getCoordinates(location: Location, context: LocationContext): Coordinates | undefined {
    if (location.x === undefined && location.y === undefined) return { x: -34.5, y: -10, z: 0 }
    return this.getSquarePosition(location, context)
  }

  getSquarePosition(location: Location, { rules }: MaterialContext) {
    if (rules.game !== this.game) {
      this.refreshDeltaPosition(rules)
      this.game = rules.game
    }
    const baseX = -41
    const baseY = -19
    const computedX = location.x! - (this.deltaX ?? 0)
    const computedY = location.y! - (this.deltaY ?? 0)
    return {
      x: baseX + (computedX! * (characterCardDescription.width + 0.2)),
      y: baseY + (computedY! * (characterCardDescription.height + 0.2)),
      z: 0
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

  canShortClick(move: MaterialMove, location: Location): boolean {
    if (!isMoveItemType(MaterialType.CharacterCard)(move) || move.location?.type !== location.type) return false
    return move.location?.x === location.x && move.location?.y === location.y
  }
}

const alkaneSquareCss = css`
  background-color: rgba(255, 255, 255, 0.4);
  pointer-events: none
`