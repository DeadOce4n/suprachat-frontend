import React, { useState, useEffect, useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import Icofont from '../Icofont'
import Player from './styles.js'

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
      <Player.ToggleButton onClick={handleToggle} aria-label='hide/show player' className={visible ? 'down' : ''}>
        <Icofont className='icofont-rounded-up' />
      </Player.ToggleButton>
      <Player.RadioContainer className={visible ? 'visible' : ''}>
        <Player.Controls>
          <Player.Button onClick={handlePlayPause} aria-label='play/pause button'>
            <Icofont className={isPlaying ? 'icofont-pause' : 'icofont-play-alt-1'} />
          </Player.Button>
          <Player.Slider min='0' max='100' value={volume} onChange={handleVolume} />
        </Player.Controls>
        <Player.SongInfo><span>{metadata.title} - {metadata.artist}</span></Player.SongInfo>
        <Player.Streamer><Icofont className='icofont-radio-mic' />{metadata.streamerName || 'AutoDJ'}</Player.Streamer>
      </Player.RadioContainer>
    </>
  )
}

export default Radio
