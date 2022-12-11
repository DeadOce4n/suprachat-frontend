import React, { useState, useRef } from 'react'
import Icofont from '../Icofont'
import Player from './styles.js'
import { useNowPlaying, useControls } from '../../hooks/useRadio'

const Radio = () => {
  const { status, data } = useNowPlaying()
  const audioElement = useRef(null)
  const {
    handleVolume,
    handlePlayPause,
    isPlaying,
    volume
  } = useControls(audioElement, process.env.GATSBY_RADIO_URL)
  const [visible, setVisible] = useState(true)

  const handleToggle = () => {
    setVisible(!visible)
  }

  return (
    <>
      <audio ref={audioElement} />
      <Player.ToggleButton
        onClick={handleToggle}
        aria-label='hide/show player'
        className={visible ? 'down' : ''}
      >
        <Icofont className='icofont-rounded-up' />
      </Player.ToggleButton>
      <Player.Container className={visible ? 'visible' : ''}>
        <Player.Controls>
          <Player.Button onClick={handlePlayPause} aria-label='play/pause button'>
            <Icofont className={isPlaying ? 'icofont-pause' : 'icofont-play-alt-1'} />
          </Player.Button>
          <Player.Slider
            min='0'
            max='100'
            value={volume}
            onChange={e => handleVolume(Number(e.target.value))}
          />
        </Player.Controls>
        <Player.SongInfo>
          <span>{data?.song.title} - {data?.song.artist}</span>
        </Player.SongInfo>
        <Player.Streamer>
          <Icofont className='icofont-radio-mic' />{data?.streamer || 'AutoDJ'}
        </Player.Streamer>
      </Player.Container>
    </>
  )
}

export default Radio
