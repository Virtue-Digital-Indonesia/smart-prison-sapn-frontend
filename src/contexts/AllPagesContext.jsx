import { createContext, useState } from 'react'

// CONSTANT
import { values } from 'constants/values'

// MUIS
import useMediaQuery from '@mui/material/useMediaQuery'

// UTILITIES
import { readUserProfileFromLocalStorage } from 'utilities/localStorage'

const AllPagesContext = createContext()

const AllPagesContextProvider = (props) => {
  // AUTH
  const [auth, setAuth] = useState(readUserProfileFromLocalStorage())
  const [loading, setLoading] = useState(false)

  // BREAKPOINT
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.only('xs'))
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.only('sm'))
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.only('md'))
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.only('lg'))
  const isXlScreen = useMediaQuery((theme) => theme.breakpoints.only('xl'))

  let breakpointType
  isXsScreen && (breakpointType = 'xs')
  isSmScreen && (breakpointType = 'sm')
  isMdScreen && (breakpointType = 'md')
  isLgScreen && (breakpointType = 'lg')
  isXlScreen && (breakpointType = 'xl')

  console.log('breakpointType: ', breakpointType)

  // SNACKBAR
  const [snackbarObject, setSnackbarObject] = useState(
    values.initialSnackbarObject
  )

  return (
    <AllPagesContext.Provider
      value={{
        // AUTH
        auth,
        setAuth,
        // BREAKPOINT
        breakpointType,
        // LOADING
        loading, setLoading,
        // SNACKBAR
        snackbarObject,
        setSnackbarObject,
      }}
    >
      {props.children}
    </AllPagesContext.Provider>
  )
}

export { AllPagesContextProvider, AllPagesContext }
