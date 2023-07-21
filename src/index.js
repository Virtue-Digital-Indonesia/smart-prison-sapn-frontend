import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// COMPONENTS
import App from './App'
import GlobalStyles from 'components/GlobalStyles/GlobalStyles'

// CONSTANTS
import theme from 'constants/theme'

// CONTEXTS
import { AllPagesContextProvider } from 'contexts/AllPagesContext'

// MUIS
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles'
import { LicenseInfo } from '@mui/x-license-pro'

// STYLES
import './index.css'

LicenseInfo.setLicenseKey(process.env.REACT_APP_DATA_GRID_PREMIUM_LICENSE)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={createTheme(theme)}>
    <StyledEngineProvider injectFirst>
      <AllPagesContextProvider>
        <BrowserRouter>
          <GlobalStyles />
          <App />
        </BrowserRouter>
      </AllPagesContextProvider>
    </StyledEngineProvider>
  </ThemeProvider>
)
