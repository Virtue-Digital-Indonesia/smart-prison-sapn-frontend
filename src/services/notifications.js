// APIS
import axios from 'apis/axios'

// GET ALL PRAYING NOTIFICATIONS
export const getPrayingNotifications = async (inputSignal, inputToken) => {
  try {
    const response = await axios.get('/sholat', {
      signal: inputSignal,
      headers: { Authorization: `Bearer ${inputToken}` },
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

// GET ALL FIGHTING NOTIFICATIONS
export const getFightingNotifications = async (inputSignal, inputToken) => {
  try {
    const response = await axios.get('/perkelahian', {
      signal: inputSignal,
      headers: { Authorization: `Bearer ${inputToken}` },
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}
