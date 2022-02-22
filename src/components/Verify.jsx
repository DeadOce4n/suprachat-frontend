import React, { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AppContext from './AppContext'
import Seo from './Seo'
import Container from './Container'
import Form from './Form'
import Button from './Button'
import Notification from './Notification'
import userService from '../services/user'
import storageAvailable from '../utils/storageAvailable'
import { navigate } from 'gatsby'

const Verify = () => {
  const context = useContext(AppContext)
  const [notification, setNotification] = useState({ message: '', error: false })
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      nick: null,
      code: null
    }
  })

  const onSubmit = async data => {
    const nick = data.nick
    const code = data.code
    const userObject = { nick, code }
    try {
      const response = await userService.verify(userObject)
      const verifiedUser = { ...context.user, verified: true }
      context.setUser(verifiedUser)
      if (storageAvailable('localStorage')) {
        localStorage.setItem('storedUser', JSON.stringify(verifiedUser))
      }
      setNotification({ message: 'Verificación correcta 🎉', error: false })
      setTimeout(() => navigate('/app/perfil'), 2000)
    } catch (e) {
      setNotification({ message: 'Código de error inválido 😔', error: true })
      setTimeout(() => setNotification({ message: '', error: false }), 3000)
    }
  }

  useEffect(() => {
    if (userService.isVerified()) {
      navigate('/')
    }
    setValue('nick', context.user.nick)
  }, [])

  return (
    <>
      <Seo
        title='Verifica tu cuenta'
        description='Para continuar, debes introducir el código que llegó a tu correo.'
      />
      <section>
        {notification.message && <Notification message={notification.message} error={notification.error} />}
        <Container className='thin'>
          <h1>Verifica tu cuenta</h1>
          <p>Para continuar, ingresa el código de verificación que llegó a tu correo.</p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <input type='hidden' {...register('nick')} />
            <label htmlFor='code'>Código de verificación:</label>
            <input type='text' {...register('code', { required: true })} />
            <Button type='submit' primary>Verificar cuenta</Button>
          </Form>
        </Container>
      </section>
    </>
  )
}

export default Verify
