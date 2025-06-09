/* eslint-disable jsdoc/no-undefined-types */
// js/higherOrLower/higherOrLowerMechanics.js

/**
 * Class that handles the game mechanics for the Higher or Lower game.
 */
export class HigherOrLowerMechanics {
  /**
   * Constructor for the HigherOrLowerMechanics class.
   *
   * @param {ScoreSystem} scoreSystem - The score system for the game.
   */
  constructor (scoreSystem) {
    this.scoreSystem = scoreSystem
  }

  /**
   * Method to check if the guess is correct.
   *
   * @param {number} firstOptionsValue - The value of the first option.
   * @param {number} secondOptionsValue - The value of the second option.
   * @param {boolean} isHigher - Whether the user guessed higher or lower.
   * @returns {boolean} - True if the guess is correct, false otherwise.
   */
  async checkGuess (firstOptionsValue, secondOptionsValue, isHigher) {
    if ((isHigher && firstOptionsValue < secondOptionsValue) || (!isHigher && firstOptionsValue > secondOptionsValue) || firstOptionsValue === secondOptionsValue) {
      return true
    } else {
      return false
    }
  }

  /**
   * Method to fetch a new artist from the server.
   *
   * @returns {Promise<object>} - The new artist object.
   */
  async fetchNewArtist () {
    const response = await fetch('/spotify-arcade/games/higherorlower/getnewartist')
    return await response.json()
  }

  /**
   * Method to end the game and send the score to the server.
   *
   * @param {number} currentScore - The current score of the game.
   */
  async endGame (currentScore) {
    const response = await fetch('/spotify-arcade/games/gameover/higherorlower', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: currentScore })
    })
    if (response.ok) {
      window.location.href = `/spotify-arcade/games/gameover/view/higherorlower?score=${currentScore}`
      this.scoreSystem.resetScore()
    } else {
      throw new Error('Failed to end the game properly')
    }
  }
}
