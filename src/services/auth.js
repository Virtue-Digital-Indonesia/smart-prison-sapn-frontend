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
