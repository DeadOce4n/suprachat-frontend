import React, { useContext, useEffect } from 'react'
import { navigate } from 'gatsby'
import { useForm } from 'react-hook-form'
import jwt_decode, { InvalidTokenError } from 'jwt-decode'
import Seo from '../components/Seo'
import AppContext from '../components/AppContext'
import Container from '../components/Container'
import Button from '../components/Button'
import Form from '../components/form/Form'
import userService from '../services/user'
import storageAvailable from '../utils/storageAvailable'
import Slider from './Slider'

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false
    }
  })
  const { user, setUser, setNotification } = useContext(AppContext)

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
      setUser(newUser)
      if (storageAvailable('localStorage')) {
        localStorage.setItem('storedUser', JSON.stringify(newUser))
      }
      navigate('/')
      setTimeout(() => {
        setNotification({ message: '', error: false })
      }, 3000)
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
      setTimeout(() => setNotification({ message: '', error: false }), 3000)
    }
  }

  useEffect(() => {
    if (user.isAuthenticated) {
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
        <Container className='thin'>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            title='Iniciar sesión'
          >
            <label htmlFor='username'>Nick:</label>
            <input type='text' {...register('username', { required: true })} />
            <label htmlFor='password'>Contraseña:</label>
            <input type='password' {...register('password', { required: true })} />
            <Slider
              label='Recordarme por 30 días'
              {...register('rememberMe', { required: false })}
            />
            <Button type='submit' primary>Iniciar sesión</Button>
          </Form>
        </Container>
      </section>
    </>
  )
}

export default Login
