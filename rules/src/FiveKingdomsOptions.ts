import { OptionsSpecV2 } from '@gamepark/rules-api'
import { baseKingdoms, Kingdom } from './cards/Kingdom'

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
type PlayerOptions = { id: Kingdom }

export type FiveKingdomsOptions = {
  players: PlayerOptions[]
}

/**
 * The option space of 5-royaumes: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 */
export const FiveKingdomsOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 2 },
  identities: { values: baseKingdoms }
}
