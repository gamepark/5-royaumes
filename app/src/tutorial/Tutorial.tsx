/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { baseKingdoms, Kingdom } from '@gamepark/5-royaumes/cards/Kingdom'
import { LocationType } from '@gamepark/5-royaumes/material/LocationType'
import { MaterialType } from '@gamepark/5-royaumes/material/MaterialType'
import { RuleId } from '@gamepark/5-royaumes/rules/RuleId'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isCreateItemType, isMoveItemType, isStartPlayerTurn, isStartRule } from '@gamepark/rules-api'
import { Fragment } from 'react'
import { Trans } from 'react-i18next'
import CastleIcon from '../images/castle/castle_token.jpg'
import FelineIcon from '../images/icons/feline.png'
import ImperialIcon from '../images/icons/imperial.png'
import RaptorIcon from '../images/icons/raptor.png'
import ReligiousIcon from '../images/icons/religious.png'
import ReptileIcon from '../images/icons/reptile.png'
import SailorIcon from '../images/icons/sailor.png'
import UrsidIcon from '../images/icons/ursids.png'
import { TutorialSetup } from './TutorialSetup'

const me = Kingdom.Feline
const opponent = Kingdom.Raptor

export class Tutorial extends MaterialTutorial<Kingdom, MaterialType, LocationType> {
  version = 4
  options = { players: [{ id: me }, { id: opponent }] }
  setup = new TutorialSetup()

  players = [{ id: me, name: 'Feline'}, { id: opponent, name: 'Rapace' }]

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.welcome">
            <strong/>
          </Trans>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.goal">
            <strong/>
          </Trans>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.bannerdeck">
            <strong/>
          </Trans>
        ),
        position: {
          x: 15,
          y: 20
        }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.CharacterCard).location(LocationType.BannerDeck).maxBy((item) => item.location.x!)],
        margin: {
          right: 15,
          bottom: 15
        }
      })
    },
    {
      popup: {
        text: (t) => (
          <>
            <span>
              <Trans defaults="tuto.banner">
                <strong/>
              </Trans>
            </span>
            <span css={gridCss}>
              {baseKingdoms.map((k) => (
                <Fragment key={k}>
                  <span><Picture src={icons[k]}/></span>
                  <span>{t(`kingdom.${k}`)}</span>
                </Fragment>
              ))}
            </span>
          </>
        )
      }
    },
    {
      popup: {
        text: (t) => (
          <>
            <span>
              <Trans defaults="tuto.other.banner">
                <strong/>
              </Trans>
            </span>
            <span css={gridCss}>
              <span><Picture src={icons[Kingdom.ReligiousOrder]}/></span>
              <span>{t(`kingdom.${Kingdom.ReligiousOrder}`)}</span>
              <span><Picture src={icons[Kingdom.ImperialOrder]}/></span>
              <span>{t(`kingdom.${Kingdom.ImperialOrder}`)}</span>
            </span>
          </>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.alkane">
            <strong/>
          </Trans>
        ),
        position: { x: 25, y: 0 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard).location(LocationType.AlkaneSquare)
        ],
        locations: [
          this.location(LocationType.AlkaneSquare).x(0).y(0).location,
          this.location(LocationType.AlkaneSquare).x(1).y(1).location,
          this.location(LocationType.AlkaneSquare).x(2).y(2).location
        ],
        margin: {
          right: 25,
          left: 2,
          top: 2,
          bottom: 2
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.place">
            <strong/>
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard).location(LocationType.BannerDeck).maxBy((item) => item.location.x!)
        ],
        locations: [
          this.location(LocationType.AlkaneSquare).x(1).y(1).location
        ],
        margin: {
          bottom: 5
        }
      }),
      move: {
        player: me,
        filter: (move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.location.x === 1 && move.location.y === 1,
        interrupt: () => true
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.adjacency">
            <strong/>
          </Trans>
        ),
        position: { x: 25, y: 0 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location((location) => location.type === LocationType.AlkaneSquare && location.x === 0 && location.y === 1),
          this.material(game, MaterialType.CharacterCard)
            .location((location) => location.type === LocationType.AlkaneSquare && location.x === 1 && location.y === 1),
          this.material(game, MaterialType.CharacterCard)
            .location((location) => location.type === LocationType.AlkaneSquare && location.x === 1 && location.y === 2)
        ],
        margin: {
          top: 1,
          bottom: 1,
          right: 17
        }
      }),
      move: {}
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.actions">
            <strong/>
          </Trans>
        ),
        position: { x: 0, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location(LocationType.PlayerHand)
            .player(me)
        ],
        margin: {
          bottom: 7,
          left: 4
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.recruit">
            <strong/>
          </Trans>
        ),
        position: { x: 0, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location(LocationType.PlayerHand)
            .player(me)
        ],
        margin: {
          bottom: 7,
          left: 4
        }
      }),
      move: {
        player: me,
        filter: (move) => isStartRule(move) && move.id === RuleId.Recruit
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.recruit.reveal">
            <strong/>
            <i/>
          </Trans>
        ),
        position: { x: 15, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location(LocationType.PlayerHand)
            .player(me)
        ],
        locations: Array.from(Array(4)).map((_, x) => this.location(LocationType.Council).player(me).x(x).location),
        margin: {
          bottom: 7,
          right: 17
        }
      })
    },
    {
      popup: {
        text: () => (
          <span css={iconCss}>
            <Trans defaults="tuto.recruit.reptile">
              <strong/>
              <i/>
              <Picture src={icons[Kingdom.Reptile]}/>
            </Trans>
          </span>
        ),
        position: { x: 0, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location(LocationType.PlayerHand)
            .player(me)
            .location((l) => l.x === 0)
        ],
        locations: [
          this.location(LocationType.Council).player(me).x(0).location
        ],
        margin: {
          bottom: 6,
          right: 5
        }
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.CharacterCard)(move)
          && game.items[move.itemType]![move.itemIndex].location.x === 0
          && move.location.type === LocationType.Council && move.location.x === 0,
        interrupt: (move) => isStartPlayerTurn(move)
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.opponent">
            <strong/>
          </Trans>
        )
      },
      move: {}
    }, {
      move: {
        player: opponent,
        filter: (move) => isMoveItemType(MaterialType.CharacterCard)(move)
          && move.location.x === 1 && move.location.y === 1
      }
    }, {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.CharacterCard)(move)
          && game.items[move.itemType]![move.itemIndex].location.x === 1
          && game.items[move.itemType]![move.itemIndex].location.y === 0
      }
    }, {
      move: {
        player: opponent,
        filter: (move) => isStartRule(move) && move.id === RuleId.Recruit
      }
    }, {
      move: {
        player: opponent,
        filter: (move) => isMoveItemType(MaterialType.CharacterCard)(move)
          && move.location.x === 0
      }
    }, {
      popup: {
        text: () => <Trans defaults="tuto.opponent.recruit"><strong/></Trans>,
        position: { x: -25, y: 0 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard).location(LocationType.Council).player(opponent)
        ],
        margin: {
          left: 20
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.place">
            <strong/>
          </Trans>
        ),
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard).location(LocationType.BannerDeck).maxBy((item) => item.location.x!)
        ],
        locations: [
          this.location(LocationType.AlkaneSquare).x(1).y(0).location
        ],
        margin: {
          bottom: 5,
          right: 20
        }
      }),
      move: {
        player: me,
        filter: (move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.location.x === 1 && move.location.y === 0
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.non-adjacent"><strong/></Trans>,
        position: { x: 25, y: 0 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard).location(LocationType.AlkaneSquare).location((l) => l.y === 0 && l.x === 2),
          this.material(game, MaterialType.CharacterCard).location(LocationType.AlkaneSquare).location((l) => l.y === 1 && l.x === 1)
        ],
        margin: {
          right: 15
        }
      })
    },
    {
      popup: {
        text: () => (

          <span css={iconCss}>
          <Trans defaults="tuto.feline">
            <strong/>
            <i/>
            <Picture src={FelineIcon} />
          </Trans>
          </span>
        ),
        position: { x: 0, y: -10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard).location(LocationType.AlkaneSquare).location((l) => l.x === 2 && (l.y === 0 || l.y === 1))
        ],
        locations: [
          this.location(LocationType.PlayerHand).player(me).location
        ],
        margin: {
          left: 5
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.CharacterCard)(move) && game.items[move.itemType]![move.itemIndex].id.back === Kingdom.Feline
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.actions">
            <strong/>
          </Trans>
        ),
        position: { x: 0, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location(LocationType.PlayerHand)
            .player(me)
        ],
        margin: {
          bottom: 7,
          left: 4
        }
      })
    },
    {
      popup: {
        text: () => (

          <span css={iconCss}>
          <Trans defaults="tuto.influence">
            <strong/>
            <i/>
            <Picture src={FelineIcon} />
          </Trans>
          </span>
        ),
        position: { x: 0, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location(LocationType.PlayerHand)
            .player(me)
        ],
        margin: {
          bottom: 7,
          left: 4
        }
      }),
      move: {
        player: me,
        filter: (move) => isStartRule(move) && move.id === RuleId.Influence
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.influence.purpose">
            <strong/>
          </Trans>
        ),
        position: { x: 0, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location(LocationType.PlayerInfluenceZone)
            .player(me)
        ],
        margin: {
          bottom: 7,
          left: 4
        }
      })
    },
    {
      popup: {
        text: () => (
          <span css={iconCss}>
          <Trans defaults="tuto.throne">
            <strong/>
            <i />
            <Picture src={CastleIcon} />
            <Picture src={FelineIcon} />
            <Picture src={RaptorIcon} />
          </Trans>
          </span>
        ),
        position: { x: 0, y: 23 }
      },
      focus: () => ({
        staticItems: [
          {
            type: MaterialType.ThroneCard,
            item: {
              id: me,
              location: {
                type: LocationType.PlayerThrone
              }
            }
          }
        ],
        margin: {
          bottom: 9,
          left: 4
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.opponent">
            <strong/>
          </Trans>
        ),
        position: { x: 0, y: 23 }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move) => {
          return isMoveItemType(MaterialType.CharacterCard)(move) && move.location.x === 0 && move.location.y === 1
        }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move) => isStartRule(move) && move.id === RuleId.Influence
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.opponent.influence">
            <strong/>
          </Trans>
        ),
        position: { x: 0, y: 23 }
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.place">
            <strong/>
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard).location(LocationType.BannerDeck).maxBy((item) => item.location.x!)
        ],
        locations: [
          this.location(LocationType.AlkaneSquare).x(0).y(0).location
        ],
        margin: {
          bottom: 5
        }
      }),
      move: {
        player: me,
        filter: (move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.location.x === 0 && move.location.y === 0
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.religious">
            <strong/>
          </Trans>
        ),
        position: { x: -15, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard).location(LocationType.AlkaneSquare).location((l) => l.x === 1 && l.y === 0)
        ],
        margin: {
          bottom: 10
        }
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.CharacterCard)(move)
          && game.items[move.itemType]![move.itemIndex].location.x === 1
          && game.items[move.itemType]![move.itemIndex].location.y === 0,
        interrupt: (move) => isStartRule(move) && move.id === RuleId.Recruit
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.religious.recruit">
            <strong/>
          </Trans>
        ),
        position: { x: 0, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location(LocationType.PlayerHand)
            .player(me)
        ],
        margin: {
          bottom: 7,
          left: 4
        }
      }),
      move: {}
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.titan">
            <strong/>
          </Trans>
        ),
        position: { x: 0, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location(LocationType.PlayerHand)
            .player(me)
        ],
        margin: {
          bottom: 7,
          left: 4
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.titan.recruit">
            <strong/>
          </Trans>
        ),
        position: { x: 15, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location(LocationType.PlayerHand)
            .player(me)
        ],
        locations: [
          this.location(LocationType.PlayerTitan).player(me).location
        ],
        margin: {
          bottom: 1,
          top: 1,
          right: 15
        }
      }),
      move: {
        player: me,
        filter: (move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.location.type === LocationType.PlayerTitan,
        interrupt: (move) => isCreateItemType(MaterialType.Castle)(move)
      }
    },
    {
      popup: {
        text: () => (
          <span css={iconCss}>
            <Trans defaults="tuto.effect">
              <strong/>
              <Picture src={CastleIcon}/>
            </Trans>
          </span>
        ),
        position: {
          x: 15, y: 20
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location(LocationType.PlayerTitan)
            .player(me)
        ],
        locations: [
          this.location(LocationType.PlayerCastle).player(me).location
        ],
        margin: {
          bottom: 1,
          top: 1,
          right: 15
        }
      }),
      move: {}
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.opponent">
            <strong/>
          </Trans>
        )
      }
    },
    {
      move: {
        player: opponent,
        filter: (move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.location.x === 1 && move.location.y === 0
      }
    },
    {
      move: {
        player: opponent,
        filter: (move) => isStartRule(move) && move.id === RuleId.Recruit
      }
    },
    {
      move: {
        player: opponent,
        filter: (move) => isMoveItemType(MaterialType.CharacterCard)(move) && move.location.type === LocationType.Council && move.location.x === 1,
        interrupt: (move) => isStartRule(move) && move.id === RuleId.RefillAlkane
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.alkane.refill">
            <strong/>
          </Trans>
        )
      },
      move: {}
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.place">
            <strong/>
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard).location(LocationType.BannerDeck).maxBy((item) => item.location.x!)
        ],
        locations: [
          this.location(LocationType.AlkaneSquare).x(0).y(2).location
        ],
        margin: {
          bottom: 5
        }
      }),
      move: {
        player: me,
        filter: (move) => {
          console.log(move)
          return isMoveItemType(MaterialType.CharacterCard)(move) && move.location.x === 0 && move.location.y === 2
        }
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.imperial">
            <strong/>
          </Trans>
        ),
        position: {
          x: 0, y: 20
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterCard)
            .location(LocationType.PlayerHand)
            .player(me)
        ],
        margin: {
          bottom: 7,
          left: 4
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.win">
            <strong/>
          </Trans>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.help">
            <strong/>
          </Trans>
        )
      }
    }
  ]
}


const icons: Partial<Record<Kingdom, string>> = {
  [Kingdom.Reptile]: ReptileIcon,
  [Kingdom.Feline]: FelineIcon,
  [Kingdom.Raptor]: RaptorIcon,
  [Kingdom.Ursid]: UrsidIcon,
  [Kingdom.Sailor]: SailorIcon,
  [Kingdom.ReligiousOrder]: ReligiousIcon,
  [Kingdom.ImperialOrder]: ImperialIcon

}

const gridCss = css`
  display: grid;
  grid-template-columns: 1fr 9fr;
  margin-top: 1em;

  > picture, img {
    height: 2em;
  }

  > span {
    display: flex;
    align-items: center;
  }
`

const iconCss = css`
  display: inline-block;

  > picture, img {
    margin-bottom: -0.4em;
    height: 1.5em;
  }
`