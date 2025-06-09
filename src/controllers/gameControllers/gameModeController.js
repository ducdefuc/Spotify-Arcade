// src/controllers/gameControllers/gameModeController.js

import { ScoreService } from '../../services/scoreService.js'

/**
 * Controller for games selection menu.
 */
export class GameModeController {
  #scoreService

  /**
   * Constructor for game mode controller.
   */
  constructor () {
    this.#scoreService = new ScoreService()
  }

  /**
   * Method to render game selection menu view.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    const user = req.session.user
    res.render('gameViews/gameMenu', { isAuthenticated: res.locals.isAuthenticated, user })
  }

  /**
   * Method to handle score at game end being sent from client.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {object} JSON object with user, highscore, score and game mode.
   */
  async handleScoreAtGameEnd (req, res, next) {
    // Get user, score and game mode from request
    const user = req.session.user
    const score = req.body.score
    const gameMode = req.params.gamemode

    let highScore = 0
    try {
      const storedHighScores = await this.#scoreService.getHighScores(user, gameMode)
      if (storedHighScores.length > 0) {
        highScore = storedHighScores[0].score
      }

      if (score > highScore) {
        await this.#scoreService.updateHighScore(user, score, gameMode)
        highScore = score
      }

      res.json({ user, highscore: highScore, score, gameMode })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Method to render game over view.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async renderGameOver (req, res, next) {
    const score = req.query.score
    const gameMode = req.params.gamemode
    const user = req.session.user
    const storedHighScores = await this.#scoreService.getHighScores(req.session.user, req.params.gamemode)
    let highScore = { score: 0 }
    if (storedHighScores.length > 0) {
      storedHighScores.forEach((storedScore) => {
        if (!highScore || storedScore.score > highScore.score) {
          highScore = storedScore
        }
      })
    }

    res.render('gameViews/gameOver', { isAuthenticated: req.isAuthenticated, user, gameMode, score, highScore })
  }
}
