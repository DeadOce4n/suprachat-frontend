import axios from 'axios'
import storageAvailable from '../utils/storageAvailable'

const baseUrl = process.env.GATSBY_API_URL

const getOne = async nick => {
  const response = await axios.get(`${baseUrl}/users/${nick}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/users`)
  return response.data
}

const register = async userObject => {
  const response = await axios.post(`${baseUrl}/users/signup`, userObject)
  return response.data
}

const verify = async userObject => {
  const response = await axios.post(`${baseUrl}/users/verify`, userObject)
  return response.data
}

const login = async userObject => {
  const response = await axios.get(`${baseUrl}/users/login`, { auth: { ...userObject } })
  return response.data
}

const update = async (formData, token) => {
  const response = await axios.patch(`${baseUrl}/users`, formData, {
    headers: {
      'X-Access-Tokens': token
    }
  })
  return response.data
}

const updatePicture = async (formData, token) => {
  const response = await axios.post(`${baseUrl}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Access-Tokens': token
    }
  })
  return response.data
}

const isLoggedIn = () => {
  if (storageAvailable('localStorage')) {
    const userJson = localStorage.getItem('storedUser')
    if (userJson) return JSON.parse(localStorage.getItem('storedUser')).isAuthenticated
    return false
  }
  return false
}

const isVerified = () => {
  if (storageAvailable('localStorage')) {
    const userJson = localStorage.getItem('storedUser')
    if (userJson) return JSON.parse(localStorage.getItem('storedUser')).verified
    return false
  }
  return false
}

const getStoredUser = () => {
  if (storageAvailable('localStorage')) {
    const userJson = localStorage.getItem('storedUser')
    if (userJson) {
      return JSON.parse(userJson)
    }
    return undefined
  }
  return undefined
}

const userService = {
  getOne,
  getAll,
  register,
  verify,
  login,
  update,
  updatePicture,
  isLoggedIn,
  isVerified,
  getStoredUser
}

export default userService
