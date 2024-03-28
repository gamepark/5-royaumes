/** @jsxImportSource @emotion/react */
import Animal from '@gamepark/awimbawe/material/Animal'
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { CustomMoveType, EagleChoice } from '@gamepark/awimbawe/rules/CustomMoveType'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { TutorialSetup } from './TutorialSetup'

const me = Heir.WhiteTiger
const opponent = Heir.BlackPanther

export class Tutorial extends MaterialTutorial<Heir, MaterialType, LocationType> {
  version = 4
  options = { players: 2 }
  setup = new TutorialSetup()

  players = [{ id: me }, { id: opponent }]

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome"><strong/><em/></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.intro"><strong/><em/></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.objective"><strong/><em/></Trans>,
        position: {
          x: -14,
          y: 2
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.HeirCard).id(Heir.WhiteTiger)
        ]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.intro.1"><strong/><em/></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.intro.2"><strong/><em/></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.hand"><strong/><em/></Trans>,
        position: {
          x: 0,
          y: 34
        }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.AnimalCard).location(LocationType.Hand).player(me)]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.piles"><strong/><em/></Trans>,
        position: {
          x: 0,
          y: 28
        }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.AnimalCard).location(LocationType.PlayerColumns).player(me)]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.elephant"><strong/><em/></Trans>
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.GrasslandElephant)
        ],
        locations: [this.location(LocationType.PlayArea).location]
      }),
      move: {
        filter: (move, game) => {
          return isMoveItemType(MaterialType.AnimalCard)(move) && game?.items[move.itemType]?.[move.itemIndex]?.id === Animal.GrasslandElephant
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.color"><strong/><em/></Trans>,
        position: {
          x: 0,
          y: 32
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.GrasslandElephant)
        ]
      })
    },
    {
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).location(LocationType.Hand).player(opponent)
        ],
        locations: [
          this.location(LocationType.PlayArea).location
        ]
      }),
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move) && game?.items[move.itemType]?.[move.itemIndex]?.id === Animal.GrasslandRhinoceros
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.rhino"><strong/><em/></Trans>,
        position: {
          x: 0,
          y: 32
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.GrasslandRhinoceros)
        ]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.power"><strong/><em/></Trans>,
        position: {
          x: -40,
          y: 30
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).location(LocationType.PlayArea)
        ]
      })
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.AnimalCard)(move)) return false
          const actualLocationId = game.items[move.itemType]![move.itemIndex].location.id
          const newLocationId = move.location.id
          return actualLocationId === 1 && newLocationId === 2
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.rhino.effect"><strong/><em/></Trans>,
        position: {
          x: 0,
          y: 35
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).location(LocationType.PlayerColumns).player(me).locationId(2).filter((item) => item.location.x === 0)
        ]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.solve.1"><strong/><em/></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.snake"><strong/><em/></Trans>,
        position: {
          x: -8,
          y: 0
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.GrasslandSnake)
        ],
        locations: [
          this.location(LocationType.PlayArea).location
        ]
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move) && game?.items[move.itemType]?.[move.itemIndex]?.id === Animal.GrasslandSnake
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.block.1"><strong/><em/></Trans>,
        position: {
          x: 10,
          y: 0
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.block.2"><strong/><em/></Trans>,
        position: {
          x: 0,
          y: 30
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.Eagle9)
        ]
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move) && game?.items[move.itemType]?.[move.itemIndex]?.id === Animal.Eagle9
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.eagle"><strong/><em/></Trans>
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move) && game?.items[move.itemType]?.[move.itemIndex]?.id === Animal.Eagle7
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.eagle.opponent"><strong/><em/></Trans>,
        position: {
          x: -42,
          y: 3
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.Eagle7)
        ],
        locations: [
          this.location(LocationType.PlayArea).location
        ]
      }),
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.eagle.choice"><strong/><em/></Trans>,
        position: {
          x: -42,
          y: 3
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.Eagle7)
        ],
        locations: [
          this.location(LocationType.PlayArea).location
        ]
      }),
    },
    {
      move: {
        player: opponent,
        filter: (move) => isCustomMoveType(CustomMoveType.EagleChoice)(move) && move.data === EagleChoice.Attack
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.eagle.fight"><strong/><em/></Trans>
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move) && game?.items[move.itemType]?.[move.itemIndex]?.id === Animal.DesertElephant
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.yellow-elephant"><strong/><em/></Trans>,
        position: {
          x: 42,
          y: 3
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.DesertElephant)
        ],
        locations: [
          this.location(LocationType.PlayArea).location
        ]
      }),
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.cheetah"><strong/><em/></Trans>,
        position: {
          x: -5,
          y: 0
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.DesertCheetah)
        ],
        locations: [
          this.location(LocationType.PlayArea).location
        ]
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move) && game?.items[move.itemType]?.[move.itemIndex]?.id === Animal.DesertCheetah
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.solve.2"><strong/><em/></Trans>,
        position: {
          x: -35,
          y: 25
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).location(LocationType.PlayArea)
        ],
        locations: [
          this.location(LocationType.PlayArea).location
        ]
      }),
    },
    {
      move: {
        player: me,
        filter: (move) => isCustomMoveType(CustomMoveType.ChoosePlayer)(move) && move.data === me
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.eagle.me"><strong/><em/></Trans>,
        position: {
          x: -5,
          y: 0
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.Eagle10)
        ],
        locations: [
          this.location(LocationType.PlayArea).location
        ]
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move) && game?.items[move.itemType]?.[move.itemIndex]?.id === Animal.Eagle10
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.eagle.start"><strong/><em/></Trans>
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move) && game?.items[move.itemType]?.[move.itemIndex]?.id === Animal.Eagle9
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.eagle.win"><strong/><em/></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.green-mouse"><strong/><em/></Trans>,
        position: {
          x: -5,
          y: 0
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.GrasslandMouse)
        ],
        locations: [
          this.location(LocationType.PlayArea).location
        ]
      }),
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move) && game?.items[move.itemType]?.[move.itemIndex]?.id === Animal.GrasslandMouse
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.discard"><strong/><em/></Trans>,
        position: {
          x: 0,
          y: 25
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.GrasslandMouse)
        ]
      }),
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.AnimalCard)(move) && game?.items[move.itemType]?.[move.itemIndex]?.id === Animal.MountainHyena
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.discard.hyena"><strong/><em/></Trans>
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.MountainHyena)
        ]
      }),
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.hyena.loose"><strong/><em/></Trans>
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.AnimalCard).id(Animal.MountainHyena)
        ]
      }),
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.reminder"><strong/><em/></Trans>
      }
    }
  ]
}
