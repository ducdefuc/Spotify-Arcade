import { HigherOrLowerHighScore } from '../models/highScores/higherOrLower.js'
import { GuessSongHighScore } from '../models/highScores/guessSong.js'

// Mapping of game modes to their corresponding Mongoose models
const gameModeModels = {
  higherorlower: HigherOrLowerHighScore,
  'guess-song': GuessSongHighScore
  // Add other game modes and their models here
}

/**
 * Service for handling scores between database and game.
 */
export class ScoreService {
  /**
   * Get high scores for a user.
   *
   * @param {object} user - User to get high scores for.
   * @param {string} gameMode - Game mode to get high scores for.
   * @returns {Promise<object>} High scores for user.
   */
  async getHighScores (user, gameMode) {
    try {
      // Get the corresponding Mongoose model for the game mode
      const HighScoreModel = gameModeModels[gameMode]
      if (!HighScoreModel) {
        throw new Error(`Unknown game mode: ${gameMode}`)
      }
      // Find high scores for the user in the specified game mode
      const highScores = await HighScoreModel.find({ displayName: user.display_name, gameMode })
      return highScores
    } catch (error) {
      console.error('Failed to retrieve high scores from database:', error)
      throw error
    }
  }

  /**
   * Update high score for a user.
   *
   * @param {object} user - User to update high score for.
   * @param {number} score - New score to update.
   * @param {string} gameMode - Game mode to update high score for.
   * @returns {Promise<void>} A promise that resolves when the high score is updated.
   */
  async updateHighScore (user, score, gameMode) {
    try {
      const HighScoreModel = gameModeModels[gameMode]
      if (!HighScoreModel) {
        throw new Error(`Unknown game mode: ${gameMode}`)
      }
      let highScore = await HighScoreModel.findOne({ displayName: user.display_name, gameMode })
      if (!highScore) {
        // Create new high score if not exists
        highScore = new HighScoreModel({ displayName: user.display_name, score, gameMode })
      } else {
        // Update existing high score if the new score is higher
        highScore.score = score
      }
      await highScore.save()
    } catch (error) {
      console.error('Error updating high score in database:', error)
      throw error
    }
  }

  /**
   * Get all high scores for a user for all game modes.
   *
   * @param {object} user - User to get high scores for.
   * @returns {Promise<object>} High scores for user across all game modes.
   */
  async getAllHighScores (user) {
    try {
      const highScores = {}
      // for each game mode, get high scores
      for (const gameMode of Object.keys(gameModeModels)) {
        const scores = await this.getHighScores(user, gameMode)
        if (scores.length > 0) {
          // Set high score to the highest score if it exists
          highScores[gameMode] = scores[0].score
        } else {
          // Set high score to 0 if no high score exists
          highScores[gameMode] = 0
        }
      }
      return highScores
    } catch (error) {
      console.error('Error getting all high scores:', error)
      throw error
    }
  }
}
