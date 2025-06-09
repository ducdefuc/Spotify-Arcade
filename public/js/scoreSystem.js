// src/public/js/scoreSystem.js

/**
 * Class representing the score system.
 */
export class ScoreSystem {
  /**
   * Constructor for ScoreSystem.
   */
  constructor () {
    this.score = 0
  }

  /**
   * Add one to the score and update the score element.
   */
  addScore () {
    this.score++
    this.#updateScoreElement()
  }

  /**
   * Reset the score to zero and update the score element.
   */
  resetScore () {
    this.score = 0
    this.#updateScoreElement()
  }

  /**
   * Get the current score.
   *
   * @returns {number} - The current score.
   */
  getScore () {
    return this.score
  }

  /**
   * Update the score element with the current score.
   */
  #updateScoreElement () {
    const scoreElement = document.getElementById('score')
    scoreElement.textContent = `Score: ${this.score}`
  }
}
