/** @jsxImportSource @emotion/react */
import { FiveKingdomsOptionsSpec } from '@gamepark/5-royaumes/FiveKingdomsOptions'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { FiveKingdomsSetup } from '@gamepark/5-royaumes/FiveKingdomsSetup'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { theme } from './theme'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="5-royaumes"
      Rules={FiveKingdomsRules}
      optionsSpec={FiveKingdomsOptionsSpec}
      GameSetup={FiveKingdomsSetup}
      material={Material}
      locators={Locators}
      animations={new MaterialGameAnimations()}
      theme={theme}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
