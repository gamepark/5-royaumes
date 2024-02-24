import { Card } from '@gamepark/5-royaumes/cards/Card'
import { Realm } from '@gamepark/5-royaumes/cards/Realm'
import { CardDescription } from '@gamepark/react-game'
import BirdOfPrey1 from '../../images/card/birdofprey/bird_of_prey_1.jpg'
import BirdOfPrey2 from '../../images/card/birdofprey/bird_of_prey_2.jpg'
import BirdOfPrey3 from '../../images/card/birdofprey/bird_of_prey_3.jpg'
import BirdOfPrey4 from '../../images/card/birdofprey/bird_of_prey_4.jpg'
import BirdOfPrey5 from '../../images/card/birdofprey/bird_of_prey_5.jpg'
import BirdsOfPreyBack from '../../images/card/birdofprey/bird_of_prey_back.jpg'
import Feline1 from '../../images/card/feline/feline_1.jpg'
import Feline2 from '../../images/card/feline/feline_2.jpg'
import Feline3 from '../../images/card/feline/feline_3.jpg'
import Feline4 from '../../images/card/feline/feline_4.jpg'
import Feline5 from '../../images/card/feline/feline_5.jpg'
import FelineBack from '../../images/card/feline/feline_back.jpg'
import ImperialOrder1 from '../../images/card/imperialorder/imperial_order1.jpg'
import ImperialOrder2 from '../../images/card/imperialorder/imperial_order2.jpg'
import ImperialOrder3 from '../../images/card/imperialorder/imperial_order3.jpg'
import ImperialOrder4 from '../../images/card/imperialorder/imperial_order4.jpg'
import Marine1 from '../../images/card/marine/marine_1.jpg'
import Marine2 from '../../images/card/marine/marine_2.jpg'
import Marine3 from '../../images/card/marine/marine_3.jpg'
import Marine4 from '../../images/card/marine/marine_4.jpg'
import Marine5 from '../../images/card/marine/marine_5.jpg'
import MarineBack from '../../images/card/marine/marine_back.jpg'
import ReligiousOrder1 from '../../images/card/religiousorder/religious_order1.jpg'
import ReligiousOrder2 from '../../images/card/religiousorder/religious_order2.jpg'
import ReligiousOrder3 from '../../images/card/religiousorder/religious_order3.jpg'
import ReligiousOrder4 from '../../images/card/religiousorder/religious_order4.jpg'
import Reptile1 from '../../images/card/reptile/reptile_1.jpg'
import Reptile2 from '../../images/card/reptile/reptile_2.jpg'
import Reptile3 from '../../images/card/reptile/reptile_3.jpg'
import Reptile4 from '../../images/card/reptile/reptile_4.jpg'
import Reptile5 from '../../images/card/reptile/reptile_5.jpg'
import ReptileBack from '../../images/card/reptile/reptile_back.jpg'
import Ursid1 from '../../images/card/ursid/ursid_1.jpg'
import Ursid2 from '../../images/card/ursid/ursid_2.jpg'
import Ursid3 from '../../images/card/ursid/ursid_3.jpg'
import Ursid4 from '../../images/card/ursid/ursid_4.jpg'
import Ursid5 from '../../images/card/ursid/ursid_5.jpg'
/** @jsxImportSource @emotion/react */
import UrsidBack from '../../images/card/ursid/ursid_back.jpg'


export class CharacterCardDescription extends CardDescription {
  borderRadius = 0.5
  width = 6.35
  height = 8.89

  backImages = {
    [Realm.Reptile]: ReptileBack,
    [Realm.Feline]: FelineBack,
    [Realm.BirdOfPrey]: BirdsOfPreyBack,
    [Realm.Ursid]: UrsidBack,
    [Realm.Marine]:  MarineBack
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
    [Card.BirdOfPrey1]: BirdOfPrey1,
    [Card.BirdOfPrey2]: BirdOfPrey2,
    [Card.BirdOfPrey3]: BirdOfPrey3,
    [Card.BirdOfPrey4]: BirdOfPrey4,
    [Card.BirdOfPrey5]: BirdOfPrey5,
    [Card.Ursid1]: Ursid1,
    [Card.Ursid2]: Ursid2,
    [Card.Ursid3]: Ursid3,
    [Card.Ursid4]: Ursid4,
    [Card.Ursid5]: Ursid5,
    [Card.Marine1]: Marine1,
    [Card.Marine2]: Marine2,
    [Card.Marine3]: Marine3,
    [Card.Marine4]: Marine4,
    [Card.Marine5]: Marine5,
    [Card.ImperialOrder1]: ImperialOrder1,
    [Card.ImperialOrder2]: ImperialOrder2,
    [Card.ImperialOrder3]: ImperialOrder3,
    [Card.ImperialOrder4]: ImperialOrder4,
    [Card.ReligiousOrder1]: ReligiousOrder1,
    [Card.ReligiousOrder2]: ReligiousOrder2,
    [Card.ReligiousOrder3]: ReligiousOrder3,
    [Card.ReligiousOrder4]: ReligiousOrder4
  }
}

export const characterCardDescription = new CharacterCardDescription()