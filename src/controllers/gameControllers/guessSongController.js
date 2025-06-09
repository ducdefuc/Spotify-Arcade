// src/controllers/gameControllers/guessSongController.js

import { SpotifyService } from '../../services/spotifyService.js'

/**
 * Controller for guess song game.
 */
export class GuessSongController {
  #spotifyService

  /**
   * Constructor for guess song controller.
   *
   * @param {SpotifyService} spotifyService - Service for Spotify API.
   */
  constructor (spotifyService) {
    this.#spotifyService = spotifyService
  }

  /**
   * Method to render guess song game.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const accessToken = req.session.accessToken.token
      const randomSong = await this.#spotifyService.getRandomTrack(accessToken)

      res.render('gameViews/guessSong', { isAuthenticated: res.locals.isAuthenticated, user: req.session.user, randomSong, accessToken })
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        error.status = 500
        error.message = 'Something went wrong internally. Please try again later.'
        next(error)
      } else {
        next(error)
      }
    }
  }

  /**
   * Get access token from session.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAccessToken (req, res, next) {
    const accessToken = req.session.accessToken.token
    console.log(accessToken)
    res.json(accessToken)
  }

  /**
   * Method to get new track for guess song game.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getNewTrack (req, res, next) {
    try {
      const accessToken = req.session.accessToken.token
      const randomSong = await this.#spotifyService.getRandomTrack(accessToken)
      res.json(randomSong)
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        error.status = 500
        error.message = 'Something went wrong internally. Please try again later.'
        next(error)
      } else {
        next(error)
      }
    }
  }
}
