// js/higherOrLower/higherOrLowerInitialize.js

import { HigherOrLowerMechanics } from './higherOrLowerMechanics.js'
import { HigherOrLowerUI } from './higherOrLowerUI.js'
import { ScoreSystem } from '../scoreSystem.js'

document.addEventListener('DOMContentLoaded', () => {
  const scoreSystem = new ScoreSystem()
  const ui = new HigherOrLowerUI()
  const mechanics = new HigherOrLowerMechanics(scoreSystem)

  // Event listeners for the higher button.
  ui.higherButton.addEventListener('click', async () => {
    // Get the values of the options
    const firstValue = parseInt(ui.firstOptionValueElement.textContent)
    const secondValue = parseInt(ui.secondOptionValueElement.textContent)
    // Hide the buttons and show the value of the second option
    ui.hideButtonsShowSecondValue()
    // Animate the value of the second option and wait for it to complete
    await ui.animateValue(ui.secondOptionValueElement, 0, secondValue, 2000)

    // Check if the user's guess is correct, if correct add score and get a new option/artist and update the UI.
    if (await mechanics.checkGuess(firstValue, secondValue, true)) {
      scoreSystem.addScore()
      const newOption = await mechanics.fetchNewArtist()
      ui.updateUIAfterGuess(newOption)
    } else {
    // If incorrect, end the game with the current score.
      setTimeout(async () => {
        await mechanics.endGame(scoreSystem.getScore())
      }, 1500)
    }
  })

  // Same thing as the higher button but for the lower button.
  ui.lowerButton.addEventListener('click', async () => {
    const firstValue = parseInt(ui.firstOptionValueElement.textContent)
    const secondValue = parseInt(ui.secondOptionValueElement.textContent)
    ui.hideButtonsShowSecondValue()
    await ui.animateValue(ui.secondOptionValueElement, 0, secondValue, 2000)

    if (await mechanics.checkGuess(firstValue, secondValue, false)) {
      scoreSystem.addScore()
      const newOption = await mechanics.fetchNewArtist()
      ui.updateUIAfterGuess(newOption)
    } else {
      setTimeout(async () => {
        await mechanics.endGame(scoreSystem.getScore())
      }, 1500)
    }
  })
})
