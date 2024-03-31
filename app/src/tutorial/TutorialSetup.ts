import { Card } from '@gamepark/5-royaumes/cards/Card'
import { isKing, isQueen, isSorcerer, isTitan } from '@gamepark/5-royaumes/cards/CardType'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { FiveKingdomsOptions } from '@gamepark/5-royaumes/FiveKingdomsOptions'
import { FiveKingdomsSetup } from '@gamepark/5-royaumes/FiveKingdomsSetup'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'

export class TutorialSetup extends FiveKingdomsSetup {
  setupMaterial(options: FiveKingdomsOptions) {
    super.setupMaterial(options)
    this.putCardOnTop()
  }

  setupAlkane() {
    const deck = this.material(MaterialType.CharacterCard)
    const raptorDeck = deck.id((id: any) => id.back === Kingdom.Raptor && !isTitan(id.front)).deck()
    const reptileDeck = deck.id((id: any) => id.back === Kingdom.Reptile && !isTitan(id.front) && !isKing(id.front)).deck()
    const felineDeck = deck.id((id: any) => id.back === Kingdom.Feline && !isTitan(id.front)).deck()
    const ursidDeck = deck.id((id: any) => id.back === Kingdom.Ursid && !isTitan(id.front)).deck()
    ursidDeck.dealOne({ type: LocationType.AlkaneSquare, x: 1, y: 0})
    felineDeck.dealOne({ type: LocationType.AlkaneSquare, x: 2, y: 0})
    felineDeck.dealOne({ type: LocationType.AlkaneSquare, x: 2, y: 1})
    raptorDeck.dealOne({ type: LocationType.AlkaneSquare, x: 0, y: 2})

    reptileDeck.dealOne({ type: LocationType.AlkaneSquare, x: 1, y: 2})
    reptileDeck.dealOne({ type: LocationType.AlkaneSquare, x: 0, y: 1})
  }

  putCardOnTop() {
    const bannerDeck = this.material(MaterialType.CharacterCard).location(LocationType.BannerDeck)
    this.material(MaterialType.CharacterCard)
      .location(LocationType.BannerDeck)
      .id((id: any) => id.back === Kingdom.Sailor && isSorcerer(id.front))
      .moveItem({ type: LocationType.BannerDeck, x: bannerDeck.length - 1 })
    this.material(MaterialType.CharacterCard)
      .location(LocationType.BannerDeck)
      .id((id: any) => id.back === Kingdom.Sailor && isQueen(id.front))
      .moveItem({ type: LocationType.BannerDeck, x: bannerDeck.length - 1 })
    this.material(MaterialType.CharacterCard)
      .location(LocationType.BannerDeck)
      .id((id: any) => id.back === Kingdom.Ursid && isQueen(id.front))
      .moveItem({ type: LocationType.BannerDeck, x: bannerDeck.length - 1 })
    this.material(MaterialType.CharacterCard)
      .location(LocationType.BannerDeck)
      .id((id: any) => id.back === Kingdom.ReligiousOrder && id.front === Card.Gaia)
      .moveItem({ type: LocationType.BannerDeck, x: bannerDeck.length - 1 })
    this.material(MaterialType.CharacterCard)
      .location(LocationType.BannerDeck)
      .id((id: any) => id.back === Kingdom.Raptor && !isQueen(id.front))
      .moveItem({ type: LocationType.BannerDeck, x: bannerDeck.length - 1 })
    this.material(MaterialType.CharacterCard)
      .location(LocationType.BannerDeck)
      .id((id: any) => id.back === Kingdom.Reptile && isKing(id.front))
      .moveItem({ type: LocationType.BannerDeck, x: bannerDeck.length - 1 })
    this.material(MaterialType.CharacterCard)
      .location(LocationType.BannerDeck)
      .id((id: any) => id.back === Kingdom.ImperialOrder && Card.Colonel === id.front)
      .moveItem({ type: LocationType.BannerDeck, x: bannerDeck.length - 11 })
    this.material(MaterialType.CharacterCard)
      .location(LocationType.BannerDeck)
      .id((id: any) => id.back === Kingdom.ImperialOrder && Card.General === id.front)
      .moveItem({ type: LocationType.BannerDeck, x: bannerDeck.length - 12 })
  }
}
