import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// COMPONENT
import AppBar from 'components/AppBar/AppBar'
import Sidebar from 'components/SideBar/Sidebar'
import ThemeReplacementWidget from 'components/ThemeReplacementWidget/ThemeReplacementWidget'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import { Stack } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

// SERVICE
import { getAccessUser } from 'services/auth'
import { getPrayingNotifications } from 'services/notifications'

// STYLES
import useStyles from './privateUseStyles'

// UTILS
import {
  setUserProfileToLocalStorage,
  removeUserProfileFromLocalStorage,
} from 'utilities/localStorage'

const Private = ({ children }) => {
  const classes = useStyles()
  const { auth, setAuth } = useContext(AllPagesContext)
  const { setPrayingListNotification } = useContext(PrivateLayoutContext)
  const location = useLocation()

  // GET USER ACCESS DATA
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
    // HANDLE TOKEN EXPIRED
    else if (resultData.status === 401) {
      setAuth({})
      removeUserProfileFromLocalStorage()
    }
  }

  // FETCH ALL PRAYING NOTIFICATION DATA
  const getPrayingNotificationData = async (inputSignal, inputToken) => {
    const resultData = await getPrayingNotifications(inputSignal, inputToken)

    if (resultData.status === 200) {
      setPrayingListNotification(resultData?.data?.data)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    getPrayingNotificationData(abortController.signal, auth.accessToken)

    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const abortController = new AbortController()

    getUserAccessData(abortController.signal, auth.accessToken)

    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

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
