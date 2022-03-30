import React, { useRef, useContext } from 'react'
import { navigate } from 'gatsby'
import { useForm } from 'react-hook-form'
import Seo from '../components/Seo'
import userService from '../services/user'
import Container from '../components/Container'
import Button from '../components/Button'
import Form from '../components/form/Form'
import AppContext from '../components/AppContext'

const forbiddenChars = [
  ' ',
  ',',
  '*',
  '?',
  '.',
  '!',
  ':',
  '<',
  '>',
  "'",
  '"',
  ';',
  '#',
  '~',
  '&',
  '@',
  '%',
  '+',
  '-'
]

const hasForbiddenChars = string => {
  return !forbiddenChars.some(char => string.includes(char)) || `El nick no puede contener ${forbiddenChars.join('')} ni espacios.`
}

const Registro = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const { setNotification } = useContext(AppContext)
  const password = useRef({})
  password.current = watch('password')

  const onSubmit = async data => {
    const newUser = {
      nick: data.username,
      email: data.email,
      password: data.password
    }
    try {
      const returnedUser = await userService.register(newUser)
      setNotification({ message: `Usuario ${returnedUser.nick} registrado con éxito!`, error: false })
      setTimeout(() => navigate('/app/login'), 3000)
    } catch (e) {
      switch (e.response.status) {
        case 409:
          setNotification({ message: 'Error: el nick o el correo ya se encuentran en uso.', error: true })
          break
        case 422:
          setNotification({ message: 'Error: el nick o la contraseña son muy cortos.', error: true })
          break
        default:
          setNotification({ message: 'Error desconocido.', error: true })
      }
    }
    setTimeout(() => setNotification({ message: '', error: false }), 3000)
  }

  const passwordsAreEqual = value => value === password.current || 'Las contraseñas no coinciden.'

  return (
    <>
      <Seo
        title='Regístrate en SupraChat'
        description='Página de registro de usuario para suprachat.net'
      />
      <section>
        <Container className='thin'>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            title='Registrate en SupraChat!'
          >
            <label htmlFor='username'>Nick:</label>
            <input
              type='text'
              {...register('username',
                {
                  required: true,
                  validate: { forbiddenChars: v => hasForbiddenChars(v) }
                })}
            />
            {errors.username && <span className='error'>{errors.username.message || 'Este campo es obligatorio.'}</span>}
            <label htmlFor='email'>Correo electrónico:</label>
            <input type='email' {...register('email', { required: true })} />
            {errors.email && <span className='error'>Este campo es obligatorio.</span>}
            <label htmlFor='password'>Contraseña:</label>
            <input type='password' {...register('password', { required: true, minLength: 4 })} />
            {errors.password && <span className='error'>{errors.password.message || 'Este campo es obligatorio.'}</span>}
            <label htmlFor='passwordConfirm'>Confirmar contraseña:</label>
            <input type='password' {...register('passwordConfirm', { required: true, validate: v => passwordsAreEqual(v) })} />
            {errors.passwordConfirm && <span className='error'>{errors.passwordConfirm.message || 'Este campo es obligatorio.'}</span>}
            <Button type='submit' primary>Crear cuenta</Button>
          </Form>
        </Container>
      </section>
    </>
  )
}

export default Registro
