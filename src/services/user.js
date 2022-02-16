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
  console.log(userObject)
  const response = await axios.post(`${baseUrl}/users/verify`, userObject)
  return response.data
}

const login = async userObject => {
  const response = await axios.get(`${baseUrl}/users/login`, { auth: { ...userObject } })
  return response.data
}

const update = async (nick, formData, token) => {
  const response = await axios.patch(`${baseUrl}/users/${nick}`, formData, {
    headers: {
      'X-Access-Tokens': token
    }
  })
  return response.data
}

const updatePicture = async (formData, nick, token) => {
  const response = await axios.post(`${baseUrl}/users/${nick}/picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Access-Tokens': token
    }
  })
  return response.data
}

const isLoggedIn = () => {
  if (storageAvailable('localStorage')) {
    return JSON.parse(localStorage.getItem('storedUser')).isAuthenticated
  }
  return false
}

const isVerified = () => {
  if (storageAvailable('localStorage')) {
    return JSON.parse(localStorage.getItem('storedUser')).verified
  }
  return false
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
  isVerified
}

export default userService
