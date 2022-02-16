import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledNotification = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: calc(100vw - 3rem);
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  height: 6.5rem;
  font-size: 0.9em;
  font-weight: 700;
  padding: 0 2rem;
  margin: 1.5rem 0 0 0;
  border-radius: 10px;
  color: var(--color-bg-${props => props.theme.theme});
  background-color: var(--color-success-${props => props.theme.theme});
`

const ErrorNotification = styled(StyledNotification)`
  background-color: var(--color-error-${props => props.theme.theme});
`

const Notification = ({ error, message }) => {
  if (error) {
    return <ErrorNotification>{message}</ErrorNotification>
  }
  return <StyledNotification>{message}</StyledNotification>
}

export default Notification

Notification.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
}
