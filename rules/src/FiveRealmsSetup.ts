import { MaterialGameSetup, MaterialItem } from '@gamepark/rules-api'
import { banners, Card, isBirdOfPrey, isFeline, isMarine, isReptile, isUrsid } from './cards/Card'
import { Realm } from './cards/Realm'
import { FiveRealmsOptions, PlayerId } from './FiveRealmsOptions'
import { FiveRealmsRules } from './FiveRealmsRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class FiveRealmsSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, FiveRealmsOptions> {
  Rules = FiveRealmsRules

  setupMaterial(options: FiveRealmsOptions) {
    this.setupBanners()
    this.setupAlkane()
    this.setupCastle(options)
  }

  setupCastle(options: FiveRealmsOptions) {
    this.material(MaterialType.CastleCard).createItem({ location: { type: LocationType.CastleDeck }, quantity: 14})

    for (let player = 1; player <= options.players; player++) {
      this.material(MaterialType.CastleCard).createItem({ location: { type: LocationType.PlayerCastle, player }, quantity: 2})
    }
  }

  setupBanners() {
    const cards: MaterialItem[] = banners
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
    this.startPlayerTurn(RuleId.ChooseBannerCard, this.game.players[0])
  }
}

export const getCardBack = (c: Card) => {
  if (isReptile(c)) return Realm.Reptile
  if (isFeline(c)) return Realm.Feline
  if (isBirdOfPrey(c)) return Realm.BirdOfPrey
  if (isUrsid(c)) return Realm.Ursid
  if (isMarine(c)) return Realm.Marine
  return
}