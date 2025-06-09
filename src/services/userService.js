// src/services/userService.js

import cryptoRandomString from 'crypto-random-string'
import fetch from 'node-fetch'

/**
 * Service for user-related operations
 */
export class UserService {
  /**
   * Generate Spotify login URL.
   *
   * @returns {object} The login url and state.
   */
  generateLoginUrl () {
    const scope = encodeURIComponent(process.env.SPOTIFY_SCOPES)
    const state = cryptoRandomString({ length: 32 })
    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&state=${state}`
    return { url, state }
  }

  /**
   * Get access token for authorization.
   *
   * @param {string} code The code from the callback.
   * @param {string} state The state from the callback.
   * @returns {object} The access token and state.
   */
  async getAccessToken (code, state) {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    const body = `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`
    const response = await fetch('https://accounts.spotify.com/api/token', { method: 'POST', headers, body })
    if (!response.ok) {
      const error = new Error('Failed to get access token')
      error.status = response.status
      throw error
    }
    const data = await response.json()
    return { token: data.access_token, state }
  }

  /**
   * Get user profile information.
   *
   * @param {string} token The access token.
   * @returns {object} The user profile data.
   */
  async getProfile (token) {
    const headers = { Authorization: `Bearer ${token}` }
    const response = await fetch('https://api.spotify.com/v1/me', { headers })
    if (!response.ok) {
      const error = new Error('Failed to get profile')
      error.status = response.status
      throw error
    }
    return response.json()
  }
}
