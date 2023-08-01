import { createContext, useState } from 'react'

// UTILS
import { readSapnThemeFromLocalStorage } from 'utilities/localStorage'

const PrivateLayoutContext = createContext()

const PrivateLayoutContextProvider = (props) => {
  // DRAWER
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false) // BOOLEAN
  // REPLACEMENT THEME WIDGET
  const [appTheme, setAppTheme] = useState(readSapnThemeFromLocalStorage())

  return (
    <PrivateLayoutContext.Provider
      value={{
        // DRAWER
        isDrawerExpanded,
        setIsDrawerExpanded,
        // REPLACEMENT THEME WIDGET
        appTheme,
        setAppTheme,
      }}
    >
      {props.children}
    </PrivateLayoutContext.Provider>
  )
}

export { PrivateLayoutContextProvider, PrivateLayoutContext }
