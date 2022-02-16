import React from 'react'
import { Router } from '@reach/router'
import PrivateRoute from '../../components/PrivateRoute'
import Settings from '../../components/Settings'
import Login from '../../components/Login'
import Verify from '../../components/Verify'

const Default = () => <p>Sorry, nothing here!</p>

const App = () => {
  return (
    <Router basepath='/app'>
      <PrivateRoute path='/perfil' component={Settings} />
      <PrivateRoute path='/verificar' component={Verify} />
      <Login path='/login' />
      <Default path='/' default />
    </Router>
  )
}

export default App
