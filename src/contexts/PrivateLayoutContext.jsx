import { createContext, useState } from 'react'

// UTILS
import { readSapnThemeFromLocalStorage } from 'utilities/localStorage'

const PrivateLayoutContext = createContext()

const PrivateLayoutContextProvider = (props) => {
  // DRAWER
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false) // BOOLEAN
  // REPLACEMENT THEME WIDGET
  const [appTheme, setAppTheme] = useState(readSapnThemeFromLocalStorage())
  // PRAYING NOTIFIATION DATA
  const [prayingListNotificationCounts, setPrayingListNotificationCounts] =
    useState(0)
  // FIGHTING NOTIFIATION DATA
  const [fightingListNotificationCounts, setFightingListNotificationCounts] =
    useState(0)

  return (
    <PrivateLayoutContext.Provider
      value={{
        // DRAWER
        isDrawerExpanded,
        setIsDrawerExpanded,
        // REPLACEMENT THEME WIDGET
        appTheme,
        setAppTheme,
        // PRAYING NOTIFIATION DATA
        prayingListNotificationCounts,
        setPrayingListNotificationCounts,
        // FIGHTING
        fightingListNotificationCounts,
        setFightingListNotificationCounts,
      }}
    >
      {props.children}
    </PrivateLayoutContext.Provider>
  )
}

export { PrivateLayoutContextProvider, PrivateLayoutContext }
