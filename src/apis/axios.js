import axios from 'axios'

const baseURL = `${process.env.REACT_APP_API_BASE_URL}/api/sapn`
const headers = { 'Content-Type': 'application/json' }

export default axios.create({
  baseURL: baseURL,
  headers: headers,
})
