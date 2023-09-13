// APIS
import axios from 'apis/axios'

// SIGN IN USER
export const postSignInUser = async (inputSignal, inputBodyParams) => {
  try {
    const response = await axios.post('/users/login', inputBodyParams, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

// GET USER INFORMATION
export const getUserInformation = async (inputSignal, inputToken) => {
  try {
    const response = await axios.get('/users/me', {
      signal: inputSignal,
      headers: { Authorization: `Bearer ${inputToken}` },
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

// GET ACCESS USER
export const getAccessUser = async (inputSignal, inputToken) => {
  try {
    const response = await axios.get('/module/menu-list', {
      signal: inputSignal,
      headers: { Authorization: `Bearer ${inputToken}` },
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}
