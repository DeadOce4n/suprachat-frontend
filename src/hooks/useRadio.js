import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import NowPlaying from '../adapters/nowPlaying'

export const useNowPlaying = () => {
  const { status, data } = useQuery({
    queryKey: ['radio', 'nowPlaying'],
    queryFn: async () => {
      const res = await fetch(process.env.GATSBY_NOWPLAYING_URL)
      const data = await res.json()
      if (!res.ok) {
        throw new Error('Error obteniendo metadatos de la radio')
      }
      return new NowPlaying(data)
    },
    refetchInterval: 5000,
    onSuccess: data => {
      if (window && 'mediaSession' in window.navigator && data) {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: data.song.title,
          artist: data.song.artist,
          album: data.song.album,
          artwork: [
            { src: data.song.art }
          ]
        })
      }
    }
  })

  return {
    status,
    data
  }
}

export const useControls = (audioElement, src) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)

  const handlePlayPause = () => {
    if (audioElement) {
      if (!isPlaying) {
        audioElement.current.src = window.navigator.userAgent.includes('Firefox')
          ? `${src}?refresh=${Date.now()}`
          : src
        audioElement.current.load()
        audioElement.current.play().catch(e => console.log(e))
      } else {
        audioElement.current.pause()
        audioElement.current.src = ''
      }
      setIsPlaying(prev => !prev)
    }
  }

  const handleVolume = vol => {
    setVolume(vol)
    audioElement.current.volume = vol / 100
  }

  return {
    isPlaying,
    handlePlayPause,
    volume,
    handleVolume
  }
}
