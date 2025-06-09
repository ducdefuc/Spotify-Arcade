/* eslint-disable jsdoc/no-undefined-types */

// js/guessSong/guessSongMechanics.js

/**
 * Class that handles the game mechanics for the Guess the Song game.
 */
export class GuessSongMechanics {
  /**
   * Constructor for the GuessSongMechanics class.
   *
   * @param {ScoreSystem} scoreSystem - The score system for the game.
   */
  constructor (scoreSystem) {
    this.scoreSystem = scoreSystem
  }

  /**
   * Method to play the song preview.
   *
   * @param {string} trackUri - The URI of the track to play.
   */
  async playSongPreview (trackUri) {
    const deviceId = window.spotifyDeviceId
    const token = window.spotifyAccessToken

    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [trackUri] }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const error = new Error(`Failed to play song preview: ${response.statusText}`)
      error.status = response.status
      throw error
    }
  }

  /**
   * Method to pause the song preview.
   */
  async pauseSongPreview () {
    const deviceId = window.spotifyDeviceId
    const token = window.spotifyAccessToken

    const response = await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const error = new Error(`Failed to pause song preview: ${response.statusText}`)
      error.status = response.status
      throw error
    }
  }

  /**
   * Method to resume the song preview.
   */
  async resumeSongPreview () {
    const deviceId = window.spotifyDeviceId
    const token = window.spotifyAccessToken

    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const error = new Error(`Failed to resume song preview: ${response.statusText}`)
      error.status = response.status
      throw error
    }
  }

  /**
   * Method to check if the guess is correct.
   *
   * @param {string} userGuess - The user's guess.
   * @param {string} correctSongName - The correct song name.
   * @returns {boolean} - True if the guess is correct, false otherwise.
   */
  checkGuess (userGuess, correctSongName) {
    // Normalize the user guess
    const normalizedGuess = this.#normalizeString(userGuess)
    // Normalize the correct song name
    const normalizedSongName = this.#normalizeString(correctSongName)
    // Check if the normalized user guess is equal to the normalized song name, if equal return true, else return false
    const result = normalizedGuess === normalizedSongName

    return result
  }

  /**
   * Method to fetch a new track from the server.
   *
   * @returns {Promise<object>} - The new track object.
   */
  async fetchNewTrack () {
    const response = await fetch('/spotify-arcade/games/guess-song/getnewtrack')
    return await response.json()
  }

  /**
   * Method to end the game and send the score to the server.
   *
   * @param {number} currentScore - The current score of the game.
   */
  async endGame (currentScore) {
    const response = await fetch('/spotify-arcade/games/gameover/guess-song', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: currentScore })
    })
    if (response.ok) {
      window.location.href = `/spotify-arcade/games/gameover/view/guess-song?score=${currentScore}`
      this.scoreSystem.resetScore()
    } else {
      throw new Error('Failed to end the game properly')
    }
  }

  /**
   * Method to normalize a string.
   *
   * @param {string} str - The string to normalize.
   * @returns {string} - The normalized string.
   */
  #normalizeString (str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '')
      .trim()
  }
}
