import { css } from '@emotion/react'
import { Card } from '@gamepark/5-royaumes/cards/Card'
import { Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { CustomMoveType } from '@gamepark/5-royaumes/rules/CustomMoveType'
import { Memory } from '@gamepark/5-royaumes/rules/Memory'
import { CardDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { isLocationSubset } from '@gamepark/react-game/dist/components/material/utils/IsLocationSubset'
import { isCustomMoveType, isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import Feline1 from '../../images/card/feline/feline_1.jpg'
import Feline2 from '../../images/card/feline/feline_2.jpg'
import Feline3 from '../../images/card/feline/feline_3.jpg'
import Feline4 from '../../images/card/feline/feline_4.jpg'
import Feline5 from '../../images/card/feline/feline_5.jpg'
import FelineBack from '../../images/card/feline/feline_back.jpg'
import Captain from '../../images/card/imperialorder/captain.jpg'
import Colonel from '../../images/card/imperialorder/colonel.jpg'
import General from '../../images/card/imperialorder/general.jpg'
import ImperialOrderBack from '../../images/card/imperialorder/imperial_order_back.jpg'
import Marechal from '../../images/card/imperialorder/marechal.jpg'
import Raptor1 from '../../images/card/raptor/raptor_1.jpg'
import Raptor2 from '../../images/card/raptor/raptor_2.jpg'
import Raptor3 from '../../images/card/raptor/raptor_3.jpg'
import Raptor4 from '../../images/card/raptor/raptor_4.jpg'
import Raptor5 from '../../images/card/raptor/raptor_5.jpg'
import RaptorBack from '../../images/card/raptor/raptor_back.jpg'
import Gaia from '../../images/card/religiousorder/gaia.jpg'
import Ouranos from '../../images/card/religiousorder/ouranos.jpg'
import Papesse from '../../images/card/religiousorder/papesse.jpg'
import ReligiousOrderBack from '../../images/card/religiousorder/religious_order_back.jpg'
import WarriorMonk from '../../images/card/religiousorder/warrior_monk.jpg'
import Reptile1 from '../../images/card/reptile/reptile_1.jpg'
import Reptile2 from '../../images/card/reptile/reptile_2.jpg'
import Reptile3 from '../../images/card/reptile/reptile_3.jpg'
import Reptile4 from '../../images/card/reptile/reptile_4.jpg'
import Reptile5 from '../../images/card/reptile/reptile_5.jpg'
import ReptileBack from '../../images/card/reptile/reptile_back.jpg'
import Sailor1 from '../../images/card/sailor/sailor_1.jpg'
import Sailor2 from '../../images/card/sailor/sailor_2.jpg'
import Sailor3 from '../../images/card/sailor/sailor_3.jpg'
import Sailor4 from '../../images/card/sailor/sailor_4.jpg'
import Sailor5 from '../../images/card/sailor/sailor_5.jpg'
import SailorBack from '../../images/card/sailor/sailor_back.jpg'
import Ursid1 from '../../images/card/ursid/ursid_1.jpg'
import Ursid2 from '../../images/card/ursid/ursid_2.jpg'
import Ursid3 from '../../images/card/ursid/ursid_3.jpg'
import Ursid4 from '../../images/card/ursid/ursid_4.jpg'
import Ursid5 from '../../images/card/ursid/ursid_5.jpg'
/** @jsxImportSource @emotion/react */
import UrsidBack from '../../images/card/ursid/ursid_back.jpg'
import { CharacterCardHelp } from '../help/CharacterCardHelp'

export class CharacterCardDescription extends CardDescription {
  borderRadius = 0.5
  width = 6.35
  height = 8.89

  backImages = {
    [Kingdom.Reptile]: ReptileBack,
    [Kingdom.Feline]: FelineBack,
    [Kingdom.Raptor]: RaptorBack,
    [Kingdom.Ursid]: UrsidBack,
    [Kingdom.Sailor]: SailorBack,
    [Kingdom.ImperialOrder]: ImperialOrderBack,
    [Kingdom.ReligiousOrder]: ReligiousOrderBack
  }

  images = {
    [Card.Reptile1]: Reptile1,
    [Card.Reptile2]: Reptile2,
    [Card.Reptile3]: Reptile3,
    [Card.Reptile4]: Reptile4,
    [Card.Reptile5]: Reptile5,
    [Card.Feline1]: Feline1,
    [Card.Feline2]: Feline2,
    [Card.Feline3]: Feline3,
    [Card.Feline4]: Feline4,
    [Card.Feline5]: Feline5,
    [Card.Raptor1]: Raptor1,
    [Card.Raptor2]: Raptor2,
    [Card.Raptor3]: Raptor3,
    [Card.Raptor4]: Raptor4,
    [Card.Raptor5]: Raptor5,
    [Card.Ursid1]: Ursid1,
    [Card.Ursid2]: Ursid2,
    [Card.Ursid3]: Ursid3,
    [Card.Ursid4]: Ursid4,
    [Card.Ursid5]: Ursid5,
    [Card.Sailor1]: Sailor1,
    [Card.Sailor2]: Sailor2,
    [Card.Sailor3]: Sailor3,
    [Card.Sailor4]: Sailor4,
    [Card.Sailor5]: Sailor5,
    [Card.Marshall]: Marechal,
    [Card.Colonel]: Colonel,
    [Card.Captain]: Captain,
    [Card.General]: General,
    [Card.Gaia]: Gaia,
    [Card.Ouranos]: Ouranos,
    [Card.Papesse]: Papesse,
    [Card.WarriorMonk]: WarriorMonk
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    const { rules } = context
    if (isCustomMoveType(CustomMoveType.ActivateCharacter)(move) && move.data === context.index) return true
    if (!isMoveItemType(MaterialType.CharacterCard)(move) || move.itemIndex !== context.index) return super.canShortClick(move, context)
    const item = rules.material(MaterialType.CharacterCard).getItem(move.itemIndex)!
    return item.location.type === LocationType.AlkaneSquare && move.location.type === LocationType.PlayerHand
  }


  help = CharacterCardHelp

  getItemExtraCss(item: MaterialItem, { rules }: MaterialContext) {
    const currentCharacter = rules.remind(Memory.CurrentCharacter)
    if (currentCharacter === undefined) return
    const character = rules.material(MaterialType.CharacterCard).getItem(currentCharacter)!
    return isLocationSubset(character.location, item.location) && css`
      border-radius: 0.5em;
      outline: solid 0.2em yellow;
    `
  }
}

export const characterCardDescription = new CharacterCardDescription()