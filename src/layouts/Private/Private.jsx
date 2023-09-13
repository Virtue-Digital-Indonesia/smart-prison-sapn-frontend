import { useContext, useEffect } from 'react'

// COMPONENT
import AppBar from 'components/AppBar/AppBar'
import Sidebar from 'components/SideBar/Sidebar'
import ThemeReplacementWidget from 'components/ThemeReplacementWidget/ThemeReplacementWidget'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import { Stack } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

// SERVICE
import { getAccessUser } from 'services/auth'

// STYLES
import useStyles from './privateUseStyles'

// UTILS
import { setUserProfileToLocalStorage } from 'utilities/localStorage'

const Private = ({ children }) => {
  const classes = useStyles()
  const { auth, setAuth } = useContext(AllPagesContext)

  const getUserAccessData = async (inputSignal, inputToken) => {
    const resultData = await getAccessUser(inputSignal, inputToken)

    if (resultData.status === 200) {
      let tempListMenu = {}
      resultData.data.forEach((item) => {
        tempListMenu[item.name_controller] = true
      })
      setUserProfileToLocalStorage({ ...auth, userAccess: tempListMenu })
      setAuth((prev) => ({ ...prev, userAccess: tempListMenu }))
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    getUserAccessData(abortController.signal, auth.accessToken)

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <Stack className={`${classes.root} no-zoom`}>
      <CssBaseline />

      {/* APP BAR */}
      <AppBar />

      <Stack direction='row' flex={1} width='100%'>
        {/* SIDE BAR */}
        <Sidebar />
        <Stack
          position='relative'
          component='main'
          className='zoom'
          width='100%'
          sx={{
            overflowY: 'scroll',
            backgroundColor: '#f1f4f5',

            '@media only screen and (max-height: 820px)': {
              height: '109vh',
            },
            '@media only screen and (min-height: 820px)': {
              height: '95vh',
            },
          }}
        >
          {children}

          {/* THEME REPLACEMENT WIDGET */}
          <ThemeReplacementWidget />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Private
