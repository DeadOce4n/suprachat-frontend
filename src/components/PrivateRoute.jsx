import React from 'react'
import { navigate } from 'gatsby'
import userService from '../services/user'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!userService.isLoggedIn() && location.pathname !== '/app/login') {
    navigate('/app/login')
    return null
  }
  if (!userService.isVerified() && location.pathname !== '/app/verificar') {
    navigate('/app/verificar')
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute
