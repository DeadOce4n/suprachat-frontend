import React, { useContext, useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import Seo from '../components/Seo'
import loadable from '@loadable/component'
import Container from '../components/Container'
import AppContext from '../components/AppContext'
import userService from '../services/user'

const GlobalStyle = createGlobalStyle`
  html, body { scroll-snap-type: y mandatory; }
  iframe, nav { scroll-snap-align: start; }
  footer { scroll-snap-align: end; }
`

const ChatFrame = loadable(() => import('../components/ChatFrame'), {
  fallback: (
    <div id='chat'>
      <h1>Cargando chat...</h1>
    </div>
  )
})

const ChatPage = () => {
  const chatUrl = `${process.env.GATSBY_KIWI_URL}`
  const [nick, setNick] = useState('')

  useEffect(() => {
    if (userService.isLoggedIn()) {
      setNick(userService.getStoredUser().nick)
    }
  }, [])

  return (
    <>
      <Seo
        title='¡Chatea ya!'
        description='Chatea con personas de todo el mundo gratis y sin registro. Chat de amistad en español para conocer personas. Nuestro vicio es chatear.'
      />
      <GlobalStyle />
      <section>
        <Container>
          <h3>
            Bienvenido a SupraChat! Lee las reglas y el manual de usuario si
            tienes dudas 😉
          </h3>
          <ChatFrame
            src={nick.length > 0
              ? `${chatUrl}?nick=${nick}&channel=${process.env.GATSBY_CHANNELS}`
              : `${chatUrl}?channel=${process.env.GATSBY_CHANNELS}`}
            title='Ventana del chat.'
          />
        </Container>
      </section>
    </>
  )
}

export default ChatPage
