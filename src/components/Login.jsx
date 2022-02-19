import React, { useContext, useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { useForm } from 'react-hook-form'
import jwt_decode, { InvalidTokenError } from 'jwt-decode'
import Seo from '../components/Seo'
import AppContext from '../components/AppContext'
import Container from '../components/Container'
import Button from '../components/Button'
import Form from '../components/Form'
import userService from '../services/user'
import storageAvailable from '../utils/storageAvailable'
import Notification from '../components/Notification'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const context = useContext(AppContext)
  const [notification, setNotification] = useState({ message: '', error: false })

  const onSubmit = async data => {
    try {
      const response = await userService.login(data)
      setNotification({ error: false, message: `Bienvenido, ${data.username}!` })
      const token = response.token
      const decodedToken = jwt_decode(token)
      const newUser = {
        ...decodedToken.user,
        token,
        isAuthenticated: true
      }
      context.setUser(newUser)
      if (storageAvailable('localStorage')) {
        localStorage.setItem('storedUser', JSON.stringify(newUser))
      }
      setTimeout(() => navigate('/'), 3000)
    } catch (e) {
      if (e.response) {
        switch (e.response.status) {
          case 404:
            setNotification({ message: 'Error: no existe un usuario con ese nick.', error: true })
            break
          case 401:
            setNotification({ message: 'Error: contraseña incorrecta.', error: true })
            break
          default:
            setNotification({ message: 'Error desconocido.', error: true })
        }
      } else if (e.request) {
        setNotification({ message: 'Error: el sistema está caído.', error: true })
      } else if (e instanceof InvalidTokenError) {
        setNotification({ message: 'Error: token inválido.' })
      } else {
        setNotification({ message: 'Error desconocido.', error: true })
      }
      setTimeout(() => setNotification({ ...notification, message: '' }), 3000)
    }
  }

  useEffect(() => {
    if (context.user.isAuthenticated) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <Seo
        title='Iniciar sesión'
        description='Pantalla de inicio de sesión | SupraChat'
      />
      <section>
        {notification.message ? <Notification message={notification.message} error={notification.error} /> : null}
        <Container className='thin'>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            title='Iniciar sesión'
          >
            <label htmlFor='username'>Nick:</label>
            <input type='text' {...register('username', { required: true })} />
            <label htmlFor='password'>Contraseña:</label>
            <input type='password' {...register('password', { required: true })} />
            <Button type='submit' primary>Iniciar sesión</Button>
          </Form>
        </Container>
      </section>
    </>
  )
}

export default Login
