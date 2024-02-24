/** @jsxImportSource @emotion/react */
import { FiveRealmsOptionsSpec } from '@gamepark/5-royaumes/FiveRealmsOptions'
import { FiveRealmsRules } from '@gamepark/5-royaumes/FiveRealmsRules'
import { FiveRealmsSetup } from '@gamepark/5-royaumes/FiveRealmsSetup'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="5-royaumes" Rules={FiveRealmsRules} optionsSpec={FiveRealmsOptionsSpec} GameSetup={FiveRealmsSetup}
                  material={Material} locators={Locators} animations={new MaterialGameAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
