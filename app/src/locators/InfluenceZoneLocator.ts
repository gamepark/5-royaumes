/** @jsxImportSource @emotion/react */
import { baseKingdoms, Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { isItemContext, ListLocator, LocationContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialRules } from '@gamepark/rules-api'
import { characterCardDescription } from '../material/descriptions/CharacterCardDescription'
import { InfluenceZoneDescription } from './description/InfluenceZoneDescription'

export class InfluenceZoneLocator extends ListLocator {

  locationDescription = new InfluenceZoneDescription()

  getGap(location: Location, context: MaterialContext) {
    if (!isItemContext(context)) return {}
    const { rules, player } = context
    const y = (location.player === (player ?? rules.players[0]))? 1.5 : -1.5
    return { y }
  }

  getCoordinates(location: Location, context: MaterialContext): Coordinates {
    if (!isItemContext(context)) {
      const position = this.getInfluenceZonePosition(location, context)
      const { rules, player } = context
      if (rules.game.rule?.id === RuleId.Sorcerer && this.isMyLocation(rules, location, player) && rules.material(MaterialType.CharacterCard).selected().length) position.z += 10
      if (rules.game.rule?.id === RuleId.ChooseAction) {
        const handColor = context.rules.material(MaterialType.CharacterCard).location(LocationType.PlayerHand).player(location.player).getItem()?.id?.back
        if (location.player === context.player && location.id === handColor) position.z += 10
      }
      return position
    }

    const baseCoordinates = this.getInfluenceZonePosition(location, context)
    const { rules, player } = context
    const deltaY = (location.player === (player ?? rules.players[0]))? -4.25 : 4.25
    return {
      x: baseCoordinates.x,
      y: baseCoordinates.y + deltaY,
      z: 0.05
    }
  }

  getRotateZ(location: Location, context: LocationContext): number {
    const { player, rules } = context
    return location.player === (player ?? rules.players[0])? 0: 180
  }

  getLocations({ rules }: MaterialContext) {
    return rules.players.flatMap((player) => {
      return baseKingdoms
        .map(id => ({
          type: LocationType.PlayerInfluenceZone,
          player,
          id: id
        }))
    })
  }

  getInfluenceZonePosition(location: Location, { rules, player }: MaterialContext) {
    const xIndex = location.id - 1
    if (location.player === (player ?? rules.players[0])) {
      return {
        x: 13 + (xIndex * (characterCardDescription.width + 0.4)),
        y: 13.4,
        z: 0 }
    }

    return {
      x: 13 - (xIndex * (characterCardDescription.width + 0.4)),
      y: -19.4,
      z: 0 }
  }

  isMyLocation(rules: MaterialRules, location: Location, player?: Kingdom) {
    return rules.game.rule?.player === location.player && location.player === player
  }

}

export const influenceZoneLocator = new InfluenceZoneLocator()