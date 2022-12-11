export default class NowPlaying {
  constructor(rawNowPlaying) {
    const { now_playing } = rawNowPlaying
    this.shId = now_playing.sh_id
    this.playedAt = now_playing.played_at
    this.duration = now_playing.duration
    this.playlist = now_playing.playlist
    this.streamer = now_playing.streamer
    this.isRequest = now_playing.is_request
    this.song = now_playing.song
    this.elapsed = now_playing.elapsed
    this.remaining = now_playing.remaining
  }
}
