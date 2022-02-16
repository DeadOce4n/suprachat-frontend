import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  width: min(100%, 45rem);
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  text-align: left;
  & > * { margin: 0; }
  h1 {
    color: var(--color-fg-${props => props.theme.theme});
    font-size: 6rem;
    line-height: 1;
  }
  button { width: 100%; }
  div.buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
  @media only screen and (min-width: 40em) {
    div.buttons { flex-direction: row; }
  }
`

const Hero = ({ children }) => {
  return (
    <div>
      <Container>
        {children}
      </Container>
    </div>
  )
}

export default Hero

Hero.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
}
