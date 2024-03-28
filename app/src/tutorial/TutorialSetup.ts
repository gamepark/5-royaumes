import { AwimbaweSetup } from '@gamepark/awimbawe/AwimbaweSetup'
import Animal, { animals } from '@gamepark/awimbawe/material/Animal'
import Heir, { heirs } from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { MaterialItem } from '@gamepark/rules-api'
import shuffle from 'lodash/shuffle'

const _ = undefined
const me = Heir.WhiteTiger
const meHand = [Animal.GrasslandSnake, Animal.DesertCheetah, Animal.Eagle10, Animal.GrasslandMouse]
const meColumns = [
  [_, Animal.GrasslandElephant],
  [_, Animal.MountainSnake],
  [Animal.Eagle8, Animal.MountainCheetah],
  [_, Animal.PlainElephant]
]
const opponent = Heir.BlackPanther
const opponentHand = [Animal.GrasslandRhinoceros, Animal.Eagle7]
const opponentColumns = [
  [Animal.GrasslandCheetah, Animal.MountainHyena],
  [Animal.GrasslandHyena, Animal.PlainMouse],
  [_, Animal.DesertElephant],
  [_, Animal.Eagle9]
]
export class TutorialSetup extends AwimbaweSetup {

  setupAnimalCards() {
    const shuffledAnimal = shuffle(
      animals
        .filter((a) => !meHand.includes(a) && !meColumns.some((c) => c.includes(a)))
        .filter((a) => !opponentHand.includes(a) && !opponentColumns.some((c) => c.includes(a)))
    )

    const shuffledPlayer1 = shuffle([...shuffledAnimal.splice(0, 2), ...meHand])
    const player1Items = shuffledPlayer1.map((animal) => ({ id: animal, location: { type: LocationType.Hand, player: me } }))
    this.material(MaterialType.AnimalCard).createItems(player1Items)

    const shuffledPlayer2 = shuffle([...shuffledAnimal.splice(0, 4), ...opponentHand])
    const player2Items = shuffledPlayer2.map((animal) => ({ id: animal, location: { type: LocationType.Hand, player: opponent } }))
    this.material(MaterialType.AnimalCard).createItems(player2Items)

    for (const heir of heirs) {
      // Do it for 4 columns
      const tutoColumns = heir === me? meColumns: opponentColumns
      for (let i = 0; i < 8; i++) {
        const column = (i % 4) + 1
        const tutoAnimal = tutoColumns[column - 1][i < 4? 0: 1]
        const item: MaterialItem = {
          id: tutoAnimal === _? shuffledAnimal.shift(): tutoAnimal,
          location: { type: LocationType.PlayerColumns, player: heir, id: column }
        }

        if (i < 4) {
          item.location.rotation = { y: 1 }
        }

        this.material(MaterialType.AnimalCard).createItem(item)
      }
    }
  }
}
