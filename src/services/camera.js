// APIS
import axios from 'apis/axios'

// ADD NEW CAMERA
export const postAddNewCamera = async (
  inputSignal,
  inputToken,
  inputBodyParams
) => {
  try {
    const response = await axios.post('/camera', inputBodyParams, {
      signal: inputSignal,
      headers: { Authorization: `Bearer ${inputToken}` },
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}
