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
