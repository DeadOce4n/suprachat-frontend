import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledIframe = styled.iframe`
  width: 100%;
  min-height: 90vh;
  scroll-snap-align: start;
`

const ChatFrame = ({ src, title }) => (
  <StyledIframe src={src} title={title} id='chat' frameBorder='0' />
)

ChatFrame.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string
}

export default ChatFrame
