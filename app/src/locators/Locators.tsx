import { Realm } from '@gamepark/5-royaumes/cards/Realm'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { ItemLocator } from '@gamepark/react-game'
import { alkaneSquareLocator } from './AlkaneSquareLocator'
import { bannerDeckLocator } from './BannerDeckLocator'
import { castleStockLocator } from './CastleStockLocator'
import { discardLocator } from './DiscardLocator'
import { influenceZoneLocator } from './InfluenceZoneLocator'
import { playerCastleLocator } from './PlayerCastleLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playerThroneLocator } from './PlayerThroneLocator'
import { playerThroneRoomLocator } from './PlayerThroneRoomLocator'
import { playerTitanLocator } from './PlayerTitanLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<Realm, MaterialType, LocationType>>> = {
  [LocationType.BannerDeck]: bannerDeckLocator,
  [LocationType.PlayerThrone]: playerThroneLocator,
  [LocationType.PlayerThroneRoom]: playerThroneRoomLocator,
  [LocationType.AlkaneSquare]: alkaneSquareLocator,
  [LocationType.PlayerInfluenceZone]: influenceZoneLocator,
  [LocationType.PlayerCastle]: playerCastleLocator,
  [LocationType.CastleStock]: castleStockLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.Discard]: discardLocator,
  [LocationType.PlayerTitan]: playerTitanLocator
}
