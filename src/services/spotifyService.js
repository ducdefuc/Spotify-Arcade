// src/services/spotifyService.js

import fetch from 'node-fetch'
import { Genre } from '../models/genre.js'

/**
 * Service class for Spotify API.
 */
export class SpotifyService {
  /**
   * Method to get artist info from Spotify.
   *
   * @param {string} accessToken - Access token to validate user session to use Spotify API.
   * @returns {object} Artist info object with name and followers.
   */
  async getArtistInfo (accessToken) {
    const randomArtistId = await this.#getRandomArtistID(accessToken)
    const headers = { Authorization: `Bearer ${accessToken}` }
    const url = `https://api.spotify.com/v1/artists/${randomArtistId}`
    const response = await fetch(url, { headers })
    if (!response.ok) {
      throw new Error(`Failed to fetch artist info, status code: ${response.status}`)
    }
    const artistData = await response.json()
    return artistData
  }

  /**
   * Method to get a random track from Spotify.
   *
   * @param {string} accessToken - Access token to validate user session to use Spotify API.
   * @returns {Array} Array of tracks.
   */
  async getRandomTrack (accessToken) {
    const headers = { Authorization: `Bearer ${accessToken}` }
    const randomGenre = await this.#fetchRandomGenre(headers)
    const tracks = await this.#fetchRecommendationTracks(randomGenre, headers)
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)]
    return randomTrack
  }

  /**
   * Method to get a random artist ID from Spotify.
   *
   * @param {string} accessToken - Access token to validate user session to use Spotify API.
   * @returns {string} Random artist ID.
   */
  async #getRandomArtistID (accessToken) {
    const headers = { Authorization: `Bearer ${accessToken}` }
    const randomGenre = await this.#fetchRandomGenre(headers)
    const tracks = await this.#fetchRecommendationTracks(randomGenre, headers)
    const randomArtist = this.#selectRandomArtist(tracks)
    return randomArtist.id
  }

  /**
   * Method to fetch available genres from Spotify.
   *
   * @param {object} headers - Authorization headers.
   * @returns {Array} Array of available genres.
   */
  async #fetchRandomGenre (headers) {
    /* Not needed anymore, because genres are now stored in mongodb database.
    const response = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', { headers })
    if (!response.ok) {
      throw new Error(`Failed to fetch genres, status code: ${response.status}`)
    }
    const data = await response.json()
    return data.genres
    */
    const randomGenre = await Genre.aggregate([
      { $sample: { size: 1 } }
    ])

    return randomGenre[0].name
  }

  /**
   * Method to fetch recommendation tracks based on genre.
   *
   * @param {string} genre - Genre to fetch recommendations for.
   * @param {object} headers - Authorization headers.
   * @returns {Array} Array of tracks.
   */
  async #fetchRecommendationTracks (genre, headers) {
    const url = `https://api.spotify.com/v1/recommendations?limit=20&seed_genres=${genre}`
    const response = await fetch(url, { headers })
    if (response.status === 429) {
      console.log(`Rate limit exceeded, Time remaining: ${response.headers.get('Retry-After')} seconds`)
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch recommendation tracks, status code: ${response.status}`)
    }
    const data = await response.json()
    return data.tracks
  }

  /**
   * Method to select a random artist from tracks.
   *
   * @param {Array} tracks - Array of tracks.
   * @returns {object} Random artist object.
   */
  #selectRandomArtist (tracks) {
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)]
    return randomTrack.artists[0]
  }
}
