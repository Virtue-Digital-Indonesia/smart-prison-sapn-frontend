// CONSTANTS
import { intialAppTheme } from 'constants/values'

const keyUserProfile = 'smart-prison-sapn'
const keySapnTheme = 'sapn-theme'
const keyAddAuthority = 'add-authority'
const keyAddValueSetting = 'add-value-setting'
const keyAddCamera = 'add-camera'

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

// VALUE SETTING
export const setValueSettingToLocalStorage = (inputUserObject) => {
  localStorage.setItem(keyAddValueSetting, JSON.stringify(inputUserObject))
}

export const readValueSettingFromLocalStorage = () => {
  return localStorage.getItem(keyAddValueSetting)
    ? JSON.parse(localStorage.getItem(keyAddValueSetting))
    : intialAppTheme
}

export const removeValueSettingFromLocalStorage = () => {
  return localStorage.removeItem(keyAddValueSetting)
}

// CAMERA
export const setCameraToLocalStorage = (inputUserObject) => {
  localStorage.setItem(keyAddCamera, JSON.stringify(inputUserObject))
}

export const readCameraFromLocalStorage = () => {
  return localStorage.getItem(keyAddCamera)
    ? JSON.parse(localStorage.getItem(keyAddCamera))
    : intialAppTheme
}

export const removeCameraFromLocalStorage = () => {
  return localStorage.removeItem(keyAddCamera)
}
