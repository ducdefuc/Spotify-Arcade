// src/controllers/gameControllers/higherOrLowerController.js

import { SpotifyService } from '../../services/spotifyService.js'

/**
 * Controller for higher or lower game.
 */
export class HigherOrLowerController {
  #spotifyService

  /**
   * Constructor for higher or lower controller.
   *
   * @param {SpotifyService} spotifyService - Service for Spotify API.
   */
  constructor (spotifyService) {
    this.#spotifyService = spotifyService
  }

  /**
   * Method to render higher or lower game.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const firstOptionArtist = await this.#spotifyService.getArtistInfo(req.session.accessToken.token)
      const secondOptionArtist = await this.#spotifyService.getArtistInfo(req.session.accessToken.token)

      res.render('gameViews/higherOrLower', { isAuthenticated: res.locals.isAuthenticated, user: req.session.user, firstOptionArtist, secondOptionArtist })
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
   * Method to get new artist for higher or lower game.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getNewArtist (req, res, next) {
    try {
      const secondOptionArtist = await this.#spotifyService.getArtistInfo(req.session.accessToken.token)
      res.json(secondOptionArtist)
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
