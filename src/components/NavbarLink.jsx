import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const StyledLink = styled(Link)`
  font: 700 0.875em var(--font-secondary);
  text-decoration: none;
  color: var(--color-fg-accent-${props => props.theme.theme});
  padding: 1rem;

  &:nth-child(1) { margin-top: 1rem; }
  &:last-child { margin-bottom: 1rem; }

  @media only screen and (min-width: 40em) {
    padding: 1rem;
    &:nth-child(1) { margin-top: 0; }
    &:last-child { margin-bottom: 0; }
  }
`

const NavbarLink = props => {
  return <StyledLink {...props} />
}

export default NavbarLink

NavbarLink.propTypes = {
  children: PropTypes.string
}
