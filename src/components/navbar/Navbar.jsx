import React, { useState, useContext } from 'react'
import { Link, navigate } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import Nav from './styles.js'
import PropTypes from 'prop-types'
import AppContext from '../AppContext'
import storageAvailable from '../../utils/storageAvailable'
import Button from '../Button'
import NavbarLink from './NavbarLink'
import Icofont from '../Icofont'

const Navbar = ({ pages }) => {
  const context = useContext(AppContext)
  const [visible, setVisible] = useState(false)
  const toggleTheme = () => context.setTheme(context.theme === 'light' ? 'dark' : 'light')

  const handleClickRegister = () => {
    navigate('/registro')
    setVisible(!visible)
  }

  const handleClickLogin = () => {
    navigate('/app/login')
    setVisible(!visible)
  }

  const handleClickLogout = () => {
    if (storageAvailable('localStorage')) {
      localStorage.clear()
    }
    if (location.pathname !== '/app/login') navigate('/app/login')
    setVisible(!visible)
    context.setUser({
      isAuthenticated: false,
      token: null,
      nick: null
    })
  }

  const handleToggle = () => {
    toggleTheme()
    setVisible(!visible)
    if (storageAvailable('localStorage')) {
      localStorage.setItem('theme', context.theme === 'light' ? 'dark' : 'light')
    }
  }

  return (
    <ThemeProvider theme={{ theme: context.theme }}>
      <Nav.Container>
        <Nav.Start>
          <Nav.Logo>
            <Link to='/'>SUPRACHAT</Link>
          </Nav.Logo>
          <Nav.BurgerButton
            onClick={() => setVisible(!visible)}
            visible={visible}
            aria-label='burger-menu'
          >
            <span />
            <span />
            <span />
          </Nav.BurgerButton>
        </Nav.Start>
        <Nav.Menu visible={visible}>
          {pages ? pages.map(page => <NavbarLink key={page.name} to={page.route} onClick={() => setVisible(!visible)}>{page.name}</NavbarLink>) : null}
          <Nav.ThemeButton onClick={handleToggle}>
            <Icofont className={context.theme === 'dark' ? 'icofont-moon' : 'icofont-sun'} />
          </Nav.ThemeButton>
        </Nav.Menu>
        <Nav.End visible={visible}>
          {context.user.isAuthenticated
            ? (
              <>
                <Link to='/app/perfil' onClick={() => setVisible(!visible)}>{context.user.nick}</Link>
                <Button onClick={handleClickLogout}>Cerrar sesión</Button>
              </>
              )
            : (
              <>
                <Button onClick={handleClickRegister}>Registrarse</Button>
                <Button primary onClick={handleClickLogin}>Iniciar sesión</Button>
              </>
              )}
        </Nav.End>
      </Nav.Container>
    </ThemeProvider>
  )
}

export default Navbar

Navbar.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
  }).isRequired).isRequired
}
