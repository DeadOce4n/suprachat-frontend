import React, { useState, useEffect, useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import styled from 'styled-components'
import Icofont from '../Icofont'

const RadioContainer = styled.div`
  font: 600 0.8125em var(--font-primary);
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  height: 6rem;
  padding: 0 2rem;
  background-color: var(--color-bg-player-${props => props.theme.theme});
  filter: drop-shadow(10px 10px 10px black);
  opacity: 0;
  z-index: 10;
  transition: all 0.25s;
  pointer-events: none;
  &.visible { opacity: 1; pointer-events: all; }
  }
  @media only screen and (max-width: 40em) {
    justify-content: space-between;
  }
`

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-left: 4rem;
  width: 20%;
  @media only screen and (max-width: 40em) {
    padding-left: 2.5rem;
    gap: 0;
    input[type="range"] {
      visibility: hidden;
      width: 0;
    }
`

const Button = styled.button`
  display: flex;
  place-items: center;
  color: var(--color-fg-accent-${props => props.theme.theme});
  background-color: transparent;
  font-size: 3rem;
  border: none;
  margin: 0;
  padding: 0;
  height: 4rem;
  cursor: pointer;
  &:active { transform: scale(0.95); }
`

const ToggleButton = styled(Button)`
  position: fixed;
  bottom: 1rem;
  left: 2rem;
  visibility: visible;
  opacity: 1;
  z-index: 100;
  &.down { transform: rotate(0.5turn); }
  transition: all 0.25s;
  @media only screen and (max-width: 40em) { left: 1rem; }
`

const Slider = styled.input.attrs(props => ({ type: 'range' }))`
  appearance: none;
  background-color: var(--color-fg-${props => props.theme.theme});
  width: 8rem;
  height: 0.25rem;
  border-radius: 2px;

  &::-webkit-slider-thumb {
    appearance: none;
    background-color: var(--color-fg-accent-${props => props.theme.theme});
    height: 1.25rem;
    width: 1.25rem;
    border: none;
    border-radius: 50%;
  }
  &::-moz-range-thumb {
    appearance: none;
    background-color: var(--color-fg-accent-${props => props.theme.theme});
    height: 1.25rem;
    width: 1.25rem;
    border: none;
    border-radius: 50%;
  }
`

const SongInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60%;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Streamer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20%;
`

const Radio = ({ radioUrl, socketUrl }) => {
  const [nowPlaying, setNowPlaying] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [srcUrl, setSrcUrl] = useState('')
  const audioElement = useRef(null)
  const [metadata, setMetadata] = useState({
    title: null,
    artist: null,
    album: null,
    art: null,
    isLive: false,
    streamerName: null
  })
  const [visible, setVisible] = useState(true)

  const { lastJsonMessage } = useWebSocket(socketUrl)

  useEffect(() => {
    if (!audioElement.current.paused) {
      setIsPlaying(true)
    }
  }, [])

  useEffect(() => {
    setNowPlaying(lastJsonMessage)
  }, [lastJsonMessage])

  useEffect(() => {
    if (nowPlaying) {
      console.log(nowPlaying)
      setMetadata({
        title: nowPlaying.now_playing.song.title,
        artist: nowPlaying.now_playing.song.artist,
        album: nowPlaying.now_playing.song.album,
        art: nowPlaying.now_playing.song.art,
        isLive: nowPlaying.live.is_live,
        streamerName: nowPlaying.live.streamer_name
      })
    }
  }, [nowPlaying])

  useEffect(() => {
    if ('mediaSession' in navigator) {
      /* eslint-disable-next-line no-undef */
      navigator.mediaSession.metadata = new MediaMetadata({
        title: metadata.title,
        artist: metadata.artist,
        album: metadata.album,
        artwork: [{ src: metadata.art, type: 'image/jpg' }]
      })
    }
  }, [metadata])

  const handlePlayPause = () => {
    if (isPlaying) {
      audioElement.current.pause()
      setSrcUrl('')
    } else {
      // Firefox caches the audio stream and does weird things when reloading
      // the page or pausing/resuming playback; appending a 'refresh' parameter
      // with a random value to the src url fixes this.
      setSrcUrl(navigator.userAgent.includes('Firefox') ? `${radioUrl}?refresh=${Date.now()}` : radioUrl)
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (srcUrl.includes(radioUrl)) {
      audioElement.current.load()
      audioElement.current.play().catch(e => console.log(e))
    }
  }, [srcUrl])

  const handleVolume = event => {
    const newVolume = event.target.value
    setVolume(newVolume)
    audioElement.current.volume = newVolume / 100
  }

  const handleToggle = () => {
    setVisible(!visible)
  }

  return (
    <>
      <audio preload='metadata' ref={audioElement}>
        <source src={srcUrl} type='audio/mpeg' />
      </audio>
      <ToggleButton onClick={handleToggle} aria-label='hide/show player' className={visible ? 'down' : ''}>
        <Icofont className='icofont-rounded-up' />
      </ToggleButton>
      <RadioContainer className={visible ? 'visible' : ''}>
        <Controls>
          <Button onClick={handlePlayPause} aria-label='play/pause button'>
            <Icofont className={isPlaying ? 'icofont-pause' : 'icofont-play-alt-1'} />
          </Button>
          <Slider min='0' max='100' value={volume} onChange={handleVolume} />
        </Controls>
        <SongInfo><span>{metadata.title} - {metadata.artist}</span></SongInfo>
        <Streamer><Icofont className='icofont-radio-mic' />{metadata.streamerName || 'AutoDJ'}</Streamer>
      </RadioContainer>
    </>
  )
}

export default Radio
