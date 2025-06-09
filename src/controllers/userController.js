// src/controllers/userController.js

import { UserService } from '../services/userService.js'
import { ScoreService } from '../services/scoreService.js'

/**
 * Controller for user-related operations
 */
export class UserController {
  #userService
  #scoreService

  /**
   * Constructor for UserController.
   */
  constructor () {
    this.#userService = new UserService()
    this.#scoreService = new ScoreService()
  }

  /**
   * Login method redirecting to Spotify login.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  login (req, res, next) {
    const { url, state } = this.#userService.generateLoginUrl()
    req.session.state = state
    res.redirect(url)
  }

  /**
   * Handle callback from Spotify after login.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async handleCallback (req, res, next) {
    const code = req.query.code
    const state = req.query.state

    if (state !== req.session.state) {
      const error = new Error('State mismatch')
      error.status = 403
      next(error)
      return
    }

    try {
      const token = await this.#userService.getAccessToken(code, state)
      req.session.accessToken = token
      res.redirect('profile')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Load profile page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async loadProfile (req, res, next) {
    try {
      const user = await this.#userService.getProfile(req.session.accessToken.token)
      req.session.user = user
      const highScores = await this.#scoreService.getAllHighScores(user)
      res.render('user/profile', { user, highScores })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Logout by destroying session.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async logout (req, res, next) {
    if (req.session.accessToken) {
      req.session.destroy()
      res.redirect('../')
    } else {
      const error = new Error('Unauthorized, make sure you are logged in')
      error.status = 401
      next(error)
    }
  }
}
