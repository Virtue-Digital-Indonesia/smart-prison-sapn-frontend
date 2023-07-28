// CONSTANTS
import { intialAppTheme } from 'constants/values'

const keyUserProfile = 'smart-prison-sapn'
const keySapnTheme = 'sapn-theme'

// USER PROFILE
export const setUserProfileToLocalStorage = (inputUserObject) => {
  localStorage.setItem(keyUserProfile, JSON.stringify(inputUserObject))
}

export const readUserProfileFromLocalStorage = () => {
  return localStorage.getItem(keyUserProfile)
    ? JSON.parse(localStorage.getItem(keyUserProfile))
    : {}
}

export const removeUserProfileFromLocalStorage = () => {
  return localStorage.removeItem(keyUserProfile)
}

// SAPN THEME
export const setSapnThemeToLocalStorage = (inputUserObject) => {
  localStorage.setItem(keySapnTheme, JSON.stringify(inputUserObject))
}

export const readSapnThemeFromLocalStorage = () => {
  return localStorage.getItem(keySapnTheme)
    ? JSON.parse(localStorage.getItem(keySapnTheme))
    : intialAppTheme
}

export const removeSapnThemeFromLocalStorage = () => {
  return localStorage.removeItem(keySapnTheme)
}
