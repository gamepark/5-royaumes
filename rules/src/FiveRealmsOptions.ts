import { OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { baseRealms, Realm } from './cards/Realm'


/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
type PlayerOptions = { id: Realm }


export type FiveRealmsOptions = {
  players: PlayerOptions[]
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const FiveRealmsOptionsSpec: OptionsSpec<FiveRealmsOptions> = {
  players: {
    id: {
      label: (t: TFunction) => t('realm.choice'),
      values: baseRealms,
      valueSpec: realm => ({ label: t => t(`player.${realm}`) })
    }
  }
}
