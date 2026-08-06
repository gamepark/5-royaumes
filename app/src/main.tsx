import { FiveKingdomsOptionsSpecV2 } from '@gamepark/5-royaumes/FiveKingdomsOptions'
import { FiveKingdomsRules } from '@gamepark/5-royaumes/FiveKingdomsRules'
import { FiveKingdomsSetup } from '@gamepark/5-royaumes/FiveKingdomsSetup'
import { GameProvider, MaterialGameAnimations } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { FiveKingdomHistory } from './history/FiveKingdomHistory'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { theme } from './theme'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="5-royaumes"
      Rules={FiveKingdomsRules}
      optionsSpec={FiveKingdomsOptionsSpecV2}
      GameSetup={FiveKingdomsSetup}
      material={Material}
      logs={FiveKingdomHistory}
      locators={Locators}
      tutorial={new Tutorial()}
      animations={new MaterialGameAnimations()}
      theme={theme}
    >
      <App/>
    </GameProvider>
  </StrictMode>
)
