// APIS
import axios from 'apis/axios'

// QUERY
import queryString from 'query-string'

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

// GET CAMERA LIST
export const getCameraList = async (
  inputSignal,
  inputToken,
  globalSearch,
  inputQueryParams
) => {
  try {
    const response = await axios.get(
      `/camera/search?globalSearch=${globalSearch}&${queryString.stringify(
        inputQueryParams
      )}`,
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

// EDIT THE CAMERA
export const putEditCamera = async (
  inputSignal,
  inputToken,
  inputBodyParams
) => {
  try {
    const response = await axios.put('/camera', inputBodyParams, {
      signal: inputSignal,
      headers: { Authorization: `Bearer ${inputToken}` },
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

// DELETE THE CAMERQ
export const deleteCamera = async (
  inputSignal,
  inputToken,
  inputBodyParams
) => {
  try {
    const response = await axios.delete('/camera', {
      signal: inputSignal,
      headers: { Authorization: `Bearer ${inputToken}` },
      data: inputBodyParams,
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}
