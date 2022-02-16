import React, { useState, useContext } from 'react'
import { Link, navigate } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import AppContext from './AppContext'
import storageAvailable from '../utils/storageAvailable'
import Button from './Button'
import NavbarLink from './NavbarLink'
import Icofont from './Icofont'

const NavbarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  width: 100%;

  @media only screen and (min-width: 60em) {
    flex-direction: row;
  }
`

const NavbarStart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 6rem;
  width: 100%;

  @media only screen and (min-width: 60em) {
    width: auto;
    height: 5rem;
  }
`

const Logo = styled.div`
  font: 700 3rem var(--font-logo);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 1rem;
  a {
    text-decoration: none;
    color: var(--color-fg-accent-${props => props.theme.theme});
  }
`

const BurgerButton = styled.button`
  background-color: transparent;
  border: 0 none transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 5rem;
  padding: 1.2rem 1.5rem;
  margin-left: auto;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5s, max-height 0.2s;
  cursor: pointer;
  @media only screen and (min-width: 60em) {
    opacity: 0;
    visibility: hidden;
    width: 0;
    padding: 0;
  }
  span {
    width: 2.5rem;
    height: 2px;
    margin: 2px;
    background-color: var(--color-fg-accent-${props => props.theme.theme});
  }
  span:first-child {
    ${props => {
      if (props.visible) {
        return 'transform: translateY(0.8125rem) rotate(45deg);'
      }
    }}
    transition: all 0.1s ease-out;
  }
  span:nth-child(2) {
    opacity: ${props => props.visible ? 0 : 1};
  }
  span:last-child {
    ${props => {
      if (props.visible) {
        return 'transform: translateY(-0.8125rem) rotate(-45deg);'
      }
    }}
    transition: all 0.1s ease-out;
  }
`

const NavbarMenu = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${props => (props.visible ? 1 : 0)};
  max-height: ${props => (props.visible ? '30rem' : 0)};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  width: 100%;
  padding-left: 2rem;
  transition: opacity 0.5s, max-height 0.2s;

  @media only screen and (min-width: 60em) {
    opacity: 1;
    height: 5rem;
    max-height: 30rem;
    visibility: visible;
    flex-direction: row;
    align-items: center;
  }

`

const NavbarEnd = styled.div`
  font: 700 1em var(--font-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  opacity: ${props => (props.visible ? 1 : 0)};
  max-height: ${props => (props.visible ? '30rem' : 0)};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  transition: opacity 0.5s, max-height 0.2s;
  white-space: nowrap;
  
  & > * {
    padding: 1rem;
    margin: 0 1rem 1rem;
    width: 100%;
  } i {
    color: var(--color-fg-accent-${props => props.theme.theme});
    margin-right: 1rem;
  }

  @media only screen and (min-width: 60em) {
    font-size: 0.75em;
    width: unset;
    opacity: 1;
    height: 5rem;
    max-height: 30rem;
    visibility: visible;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    & > * {
      padding: 1rem 2rem;
      margin: 0;
    }
`

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: var(--color-fg-accent-${props => props.theme.theme});
  background-color: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  padding: 1rem;
  margin-bottom: 1.5rem;
  font-size: 3rem;
  @media only screen and (min-width: 40em) {
    span {
      visibility: hidden;
      width: 0;
    }
    font-size: 2.25rem;
    margin-bottom: 0;
  }
`

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
      <NavbarWrapper>
        <NavbarStart>
          <Logo>
            <Link to='/'>SUPRACHAT</Link>
          </Logo>
          <BurgerButton
            onClick={() => setVisible(!visible)}
            visible={visible}
            aria-label='burger-menu'
          >
            <span />
            <span />
            <span />
          </BurgerButton>
        </NavbarStart>
        <NavbarMenu visible={visible}>
          {pages ? pages.map(page => <NavbarLink key={page.name} to={page.route} onClick={() => setVisible(!visible)}>{page.name}</NavbarLink>) : null}
          <ThemeButton onClick={handleToggle}>
            <Icofont className={context.theme === 'dark' ? 'icofont-moon' : 'icofont-sun'} />
          </ThemeButton>
        </NavbarMenu>
        <NavbarEnd visible={visible}>
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
        </NavbarEnd>
      </NavbarWrapper>
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
