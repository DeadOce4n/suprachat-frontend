import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from './AppContext'
import PropTypes from 'prop-types'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-inline: auto;
  width: min(90%, 100em);
  margin-top: 2rem;
  margin-bottom: 2rem;

  &.split {
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  &.narrow {
    width: min(90%, 50em);
  }

  &.thin { width: min(90%, 20em); }

  @media only screen and (min-width: 40em) {
    &.split {
      flex-direction: row;
      gap: 1rem;
    }
    & > * {
      flex-basis: 100%;
      align-items: center;
      justify-content: center;
      }
  }
`

const Container = ({ children, className }) => {
  const context = useContext(AppContext)
  const theme = context.theme

  return (
    <StyledContainer theme={theme} className={className}>
      {children}
    </StyledContainer>
  )
}

export default Container

Container.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}
