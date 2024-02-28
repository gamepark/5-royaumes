import { MaterialGameSetup, MaterialItem } from '@gamepark/rules-api'
import { Card, gameCards, isBirdOfPrey, isFeline, isImperialOrder, isMarine, isReligiousOrder, isReptile, isUrsid } from './cards/Card'
import { Realm } from './cards/Realm'
import { FiveRealmsOptions } from './FiveRealmsOptions'
import { FiveRealmsRules } from './FiveRealmsRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class FiveRealmsSetup extends MaterialGameSetup<Realm, MaterialType, LocationType, FiveRealmsOptions> {
  Rules = FiveRealmsRules

  setupMaterial(options: FiveRealmsOptions) {
    this.setupBanners()
    this.setupAlkane()
    this.setupCastle(options)
  }

  setupCastle(options: FiveRealmsOptions) {
    for (const player of options.players) {
      this.material(MaterialType.Castle).createItem({ location: { type: LocationType.PlayerCastle, player: player.id }, quantity: 2})
    }
  }

  setupBanners() {
    const cards: MaterialItem[] = gameCards
      .flatMap((c) =>
        Array
          .from(Array(2))
          .map(() => ({
            id: {
              back: getCardBack(c),
              front: c
            },
            location: {
              type: LocationType.BannerDeck
            }
          }))
      )

    this.material(MaterialType.CharacterCard).createItems(cards)
    this.material(MaterialType.CharacterCard).shuffle()
  }

  setupAlkane() {
    const deck = this.material(MaterialType.CharacterCard).deck()
    deck.dealOne({ type: LocationType.AlkaneSquare, x: 1, y: 0})
    deck.dealOne({ type: LocationType.AlkaneSquare, x: 2, y: 0})
    deck.dealOne({ type: LocationType.AlkaneSquare, x: 2, y: 1})

    deck.dealOne({ type: LocationType.AlkaneSquare, x: 1, y: 2})
    deck.dealOne({ type: LocationType.AlkaneSquare, x: 0, y: 2})
    deck.dealOne({ type: LocationType.AlkaneSquare, x: 0, y: 1})
  }

  start() {
    this.startPlayerTurn(RuleId.DrawBannerCard, this.game.players[0])
  }
}

export const getCardBack = (c: Card) => {
  if (isReptile(c)) return Realm.Reptile
  if (isFeline(c)) return Realm.Feline
  if (isBirdOfPrey(c)) return Realm.BirdOfPrey
  if (isUrsid(c)) return Realm.Ursid
  if (isMarine(c)) return Realm.Marine
  if (isReligiousOrder(c)) return Realm.ReligiousOrder
  if (isImperialOrder(c)) return Realm.ImperialOrder
  return
}