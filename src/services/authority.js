// APIS
import axios from 'apis/axios'

// QUERY
import queryString from 'query-string'

// GET AUTHORITY LIST
export const getAuthorityList = async (
  inputSignal,
  inputToken,
  globalSearch,
  inputQueryParams
) => {
  try {
    const response = await axios.get(
      `/group/search?globalSearch=${globalSearch}&${queryString.stringify(
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

// CREATE NEW AUTHORITY
export const postCreateNewAuthority = async (
  inputSignal,
  inputToken,
  inputBodyParams
) => {
  try {
    const response = await axios.post('/group', inputBodyParams, {
      signal: inputSignal,
      headers: { Authorization: `Bearer ${inputToken}` },
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

// EDIT THE AUTHORITY
export const putEditAuthority = async (
  inputSignal,
  inputToken,
  inputBodyParams
) => {
  try {
    const response = await axios.put('/group', inputBodyParams, {
      signal: inputSignal,
      headers: { Authorization: `Bearer ${inputToken}` },
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

// DELETE THE AUTHORITY
export const deleteAuthority = async (
  inputSignal,
  inputToken,
  inputBodyParams
) => {
  try {
    const response = await axios.delete('/group', {
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
