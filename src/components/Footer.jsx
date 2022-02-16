import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from './AppContext'
import PropTypes from 'prop-types'

const StyledFooter = styled.footer`
  font-size: 1.5rem;
  padding: 5rem;
  text-align: center;
  border-top: 1px solid rgba(${props => props.theme.theme === 'light' ? '0, 0, 0' : '255, 255, 255'}, 0.1);
`

const Footer = ({ name, author }) => {
  const context = useContext(AppContext)

  return (
    <StyledFooter>
      <span>
        <strong>&copy; {name}</strong>
      </span>
      <p>
        Esta página fue creada con {context.theme === 'dark' ? '💛' : '🖤'} por {author}
      </p>
    </StyledFooter>
  )
}

export default Footer

Footer.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}
