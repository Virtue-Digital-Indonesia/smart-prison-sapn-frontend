// APIS
import axios from 'apis/axios'

// GET LOG SHOLAT
export const getLogSholatByID = async (
  inputSignal,
  inputToken,
  inputQueryParams
) => {
  try {
    const response = await axios.get(
      `/sholat/log-sholat?id=${inputQueryParams}`,
      {
        signal: inputSignal,
        headers: { Authorization: `Bearer ${inputToken}` },
      }
    )
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

// GET LOG PERKELAHIAN
export const getLogPerkelahianByID = async (
  inputSignal,
  inputToken,
  inputQueryParams
) => {
  try {
    const response = await axios.get(
      `/perkelahian/log-perkelahian?id=${inputQueryParams}`,
      {
        signal: inputSignal,
        headers: { Authorization: `Bearer ${inputToken}` },
      }
    )
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}
  