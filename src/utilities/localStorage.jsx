// CONSTANTS
import { intialAppTheme } from 'constants/values'

const keyUserProfile = 'smart-prison-sapn'
const keySapnTheme = 'sapn-theme'
const keyAddAuthority = 'add-authority'
const keyAddValueSetting = 'add-value-setting'
<<<<<<< HEAD
const keyAddUserSetting = 'add-user-setting'
=======
const keyCameraDetail = 'camera-detail'
>>>>>>> develop

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

// USER SETTING
export const setUserSettingToLocalStorage = (inputUserObject) => {
  localStorage.setItem(keyAddUserSetting, JSON.stringify(inputUserObject))
}

export const readUserSettingFromLocalStorage = () => {
  return localStorage.getItem(keyAddUserSetting)
    ? JSON.parse(localStorage.getItem(keyAddUserSetting))
    : intialAppTheme
}

export const removeUserSettingSettingFromLocalStorage = () => {
  return localStorage.removeItem(keyAddUserSetting)
}

// CAMERA DETAIL
export const setCameraDetailToLocalStorage = (inputUserObject) => {
  localStorage.setItem(keyCameraDetail, JSON.stringify(inputUserObject))
}

export const readCameraDetailFromLocalStorage = () => {
  return localStorage.getItem(keyCameraDetail)
    ? JSON.parse(localStorage.getItem(keyCameraDetail))
    : intialAppTheme
}

export const removeCameraDetailFromLocalStorage = () => {
  return localStorage.removeItem(keyCameraDetail)
}
