// APIS
import axios from 'apis/axios'

// QUERY
import queryString from 'query-string'

// GET ALL VALUE SETTINGS
export const getValueSettingData = async (
  inputSignal,
  inputToken,
  globalSearch,
  inputQueryParams
) => {
  try {
    const response = await axios.get(
      `/score/search?globalSearch=${globalSearch}&${queryString.stringify(
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

// CREATE NEW VALUE
export const postCreateNewValue = async (
  inputSignal,
  inputToken,
  inputBodyParams
) => {
  try {
    const response = await axios.post('/score', inputBodyParams, {
      signal: inputSignal,
      headers: { Authorization: `Bearer ${inputToken}` },
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

// EDIT EXISTING VALUE
export const putEditValue = async (
  inputSignal,
  inputToken,
  inputBodyParams
) => {
  try {
    const response = await axios.put('/score', inputBodyParams, {
      signal: inputSignal,
      headers: { Authorization: `Bearer ${inputToken}` },
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

// DELETE EXISTING VALUE
export const deleteValue = async (
  inputSignal,
  inputToken,
  inputBodyParams
) => {
  try {
    const response = await axios.delete('/score', {
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
