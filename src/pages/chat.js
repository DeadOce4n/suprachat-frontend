import React, { useContext, useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import Seo from '../components/Seo'
import loadable from '@loadable/component'
import Container from '../components/Container'
import AppContext from '../components/AppContext'

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
  const context = useContext(AppContext)
  const chatUrl = `${process.env.GATSBY_KIWI_URL}?channel=${process.env.GATSBY_CHANNELS}`
  const [nick, setNick] = useState('')

  useEffect(() => {
    if (context.user.isAuthenticated) {
      setNick(context.user.nick)
    }
  }, [])

  console.log(`${chatUrl}&nick=${nick}`)

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
            src={nick.length > 0 ? `${chatUrl}&nick=${nick}` : chatUrl}
            title='Ventana del chat.'
          />
        </Container>
      </section>
    </>
  )
}

export default ChatPage
