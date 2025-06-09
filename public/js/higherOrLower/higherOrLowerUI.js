// js/higherOrLower/higherOrLowerUI.js

/**
 * Class representing the UI for the Higher or Lower game
 */
export class HigherOrLowerUI {
  /**
   * Constructor for the HigherOrLowerUI.
   */
  constructor () {
    this.higherButton = document.getElementById('higher')
    this.lowerButton = document.getElementById('lower')
    this.firstOptionNameElement = document.getElementById('firstOptionName')
    this.firstOptionValueElement = document.getElementById('firstOptionValue')
    this.firstOptionImageElement = document.getElementById('firstOptionImage')
    this.secondOptionNameElement = document.getElementById('secondOptionName')
    this.secondOptionValueElement = document.getElementById('secondOptionValue')
    this.secondOptionImageElement = document.getElementById('secondOptionImage')
    this.buttons = document.getElementById('button-container')
  }

  /**
   * Update the UI after the user has made a guess.
   *
   * @param {object} newOption - The new artist to display.
   */
  updateUIAfterGuess (newOption) {
    this.firstOptionNameElement.textContent = this.secondOptionNameElement.textContent
    this.firstOptionValueElement.textContent = this.secondOptionValueElement.textContent

    if (this.secondOptionImageElement.src) {
      this.firstOptionImageElement.src = this.secondOptionImageElement.src
    } else {
      this.firstOptionImageElement.src = '../images/noimage.png'
    }

    this.secondOptionNameElement.textContent = newOption.name
    this.secondOptionValueElement.textContent = newOption.followers.total

    if (newOption.images.length > 0) {
      this.secondOptionImageElement.src = newOption.images[0].url
    } else {
      this.secondOptionImageElement.src = '../images/noimage.png'
    }

    this.secondOptionValueElement.style.display = 'none'
    this.buttons.style.display = 'block'
  }

  /**
   * Hide the buttons and show the value of the second option.
   */
  hideButtonsShowSecondValue () {
    this.buttons.style.display = 'none'
    this.secondOptionValueElement.style.display = 'block'
  }

  /**
   * Animate the value of an element. Taken from https://css-tricks.com/animating-number-counters/.
   *
   * @param {HTMLElement} element - The element to animate.
   * @param {number} start - The starting value.
   * @param {number} end - The ending value.
   * @param {number} duration - The duration of the animation.
   * @returns {Promise} - A promise that resolves when the animation is complete.
   */
  animateValue (element, start, end, duration) {
    return new Promise(resolve => {
      let startTimestamp = null
      /**
       * Step function for the animation.
       *
       * @param {number} timestamp - The current timestamp.
       */
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        element.textContent = Math.floor(progress * (end - start) + start)
        if (progress < 1) {
          window.requestAnimationFrame(step)
        } else {
          resolve()
        }
      }
      window.requestAnimationFrame(step)
    })
  }
}
