const keyUserProfile = 'smart-prison-sapn'

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