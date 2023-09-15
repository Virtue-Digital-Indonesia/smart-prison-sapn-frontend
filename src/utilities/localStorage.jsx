// CONSTANTS
import { intialAppTheme } from 'constants/values'

const keyUserProfile = 'smart-prison-sapn'
const keySapnTheme = 'sapn-theme'
const keyAddAuthority = 'add-authority'

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

// AUTHORITY
export const setAuthorityToLocalStorage = (inputUserObject) => {
  localStorage.setItem(keyAddAuthority, JSON.stringify(inputUserObject))
}

export const readAuthorityFromLocalStorage = () => {
  return localStorage.getItem(keyAddAuthority)
    ? JSON.parse(localStorage.getItem(keyAddAuthority))
    : intialAppTheme
}

export const removeAuthorityFromLocalStorage = () => {
  return localStorage.removeItem(keyAddAuthority)
}
