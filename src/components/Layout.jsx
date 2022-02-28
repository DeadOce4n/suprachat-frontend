import React, { useState, useLayoutEffect } from 'react'
import Particles from 'react-tsparticles'
import particlesOptions from '../misc/particlesOptions.js'
import AppContext from './AppContext'
import storageAvailable from '../utils/storageAvailable'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Navbar from './Navbar'
import Footer from './Footer'
import '../css/index.css'
import Radio from './radio/Radio.jsx'

const GlobalStyle = createGlobalStyle`
  body {
    color: var(--color-fg-${props => props.theme.theme});
    background-color: var(--color-bg-${props => props.theme.theme});
  }
  h1, h2, h3 {
    color: var(--color-fg-accent-${props => props.theme.theme});
  }
  a {
    color: var(--color-fg-accent-${props => props.theme.theme});
  }
`

const Layout = ({ children }) => {
  const [user, setUser] = useState({
    nick: null,
    email: null,
    country: null,
    about: null,
    token: null,
    isAuthenticated: false,
    isVerified: false
  })
  const [theme, setTheme] = useState('light')

  useLayoutEffect(() => {
    if (storageAvailable('localStorage')) {
      const storedUser = localStorage.getItem('storedUser')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      const storedTheme = localStorage.getItem('theme')
      if (storedTheme) setTheme(storedTheme)
    }
  }, [])

  const pages = [
    { name: '¡Chatea ya!', route: '/chat' },
    { name: 'Reglas', route: '/reglas' },
    { name: 'Manual', route: '/manual' },
    { name: 'Acerca', route: '/acerca' }
  ]

  return (
    <>
      <AppContext.Provider value={{
        user,
        setUser,
        theme,
        setTheme
      }}
      >
        <ThemeProvider theme={{ theme }}>
          <GlobalStyle />
          <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
          >
            <Particles id='tsparticles' options={particlesOptions} />
            <Navbar pages={pages} />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer name='SupraChat' author='DeadOcean' />
            <Radio
              radioUrl='https://radionautica.xyz/radio/8000/radio.mp3'
              socketUrl='wss://radionautica.xyz/api/live/nowplaying/radionautica'
            />
          </div>
        </ThemeProvider>
      </AppContext.Provider>
    </>
  )
}

export default Layout
