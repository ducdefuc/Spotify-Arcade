/* eslint-disable no-undef */
/* eslint-disable camelcase */
// js/guessSong/spotifyWebplaybackSDK.js

/**
 * Initialize Spotify Web Playback SDK.
 *
 * @param {Function} onReadyCallback - Callback function to execute when Spotify SDK is ready.
 */
export async function initializeSpotifySDK (onReadyCallback) {
  /**
   * Callback function to execute when Spotify Web Playback SDK is ready.
   */
  window.onSpotifyWebPlaybackSDKReady = async () => {
    try {
      const response = await fetch('/spotify-arcade/games/guess-song/token')
      const token = await response.json()
      const player = new Spotify.Player({
        name: 'Guess the Song Game Player',
        /**
         * Get OAuth token from the server.
         *
         * @param {Function} cb - Callback function to execute when token is retrieved.
         */
        getOAuthToken: cb => { cb(token) },
        volume: 0.5
      })

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        window.spotifyDeviceId = device_id
        window.spotifyAccessToken = token
        onReadyCallback()
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      await player.connect()
    } catch (error) {
      console.error('Failed to initialize Spotify SDK:', error)
    }
  }
}
