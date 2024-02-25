import { PlayerId } from '@gamepark/5-royaumes/FiveRealmsOptions'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { ItemLocator } from '@gamepark/react-game'
import { alkaneSquareLocator } from './AlkaneSquareLocator'
import { bannerDeckLocator } from './BannerDeckLocator'
import { castleDeckLocator } from './CastleDeckLocator'
import { influenceZoneLocator } from './InfluenceZoneLocator'
import { playerCastleLocator } from './PlayerCastleLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playerThroneLocator } from './PlayerThroneLocator'
import { playerThroneRoomLocator } from './PlayerThroneRoomLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>>> = {
  [LocationType.BannerDeck]: bannerDeckLocator,
  [LocationType.PlayerThrone]: playerThroneLocator,
  [LocationType.PlayerThroneRoom]: playerThroneRoomLocator,
  [LocationType.AlkaneSquare]: alkaneSquareLocator,
  [LocationType.PlayerInfluenceZone]: influenceZoneLocator,
  [LocationType.PlayerCastle]: playerCastleLocator,
  [LocationType.CastleDeck]: castleDeckLocator,
  [LocationType.PlayerHand]: playerHandLocator
}
