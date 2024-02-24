import { hideFront, PositiveSequenceStrategy, SecretMaterialRules } from '@gamepark/rules-api'
import { PlayerId } from './FiveRealmsOptions'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerTurn } from './rules/PlayerTurn'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class FiveRealmsRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType> {
  rules = {
    [RuleId.PlayerTurn]: PlayerTurn
  }

  locationsStrategies = {
    [MaterialType.CharacterCard]: {
      [LocationType.BannerDeck]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.CharacterCard]: {
      [LocationType.BannerDeck]: hideFront,
      [LocationType.AlkaneSquare]: hideFront,
    }
  }

}