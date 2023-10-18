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

// GET DETAILS PRAYING NOTIFICATION
export const getDetailPrayingNotifications = async (
  inputSignal,
  inputToken,
  inputID
) => {
  try {
    const response = await axios.get(`/sholat/details?id=${inputID}`, {
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

// GET DETAILS FIGHTING NOTIFICATION
export const getDetailFightingNotifications = async (
  inputSignal,
  inputToken,
  inputID
) => {
  try {
    const response = await axios.get(`/perkelahian/details?id=${inputID}`, {
      signal: inputSignal,
      headers: { Authorization: `Bearer ${inputToken}` },
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}
