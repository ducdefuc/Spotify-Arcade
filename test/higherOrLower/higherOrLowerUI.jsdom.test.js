// test/higherOrLower/higherOrLowerUI.jsdom.test.js:

import { HigherOrLowerUI } from '../../public/js/higherOrLower/higherOrLowerUI.js'

describe('Testing HigherOrLowerUI', () => {
  let ui

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="button-container">
        <button id="higher">Higher</button>
        <button id="lower">Lower</button>
      </div>
      <h2 id="firstOptionName">First Artist Name</h2>
      <p id="firstOptionValue">500</p>
      <img id="firstOptionImage" src="first_image_url" />
      <h2 id="secondOptionName">Second Artist Name</h2>
      <p id="secondOptionValue">1000</p>
      <img id="secondOptionImage" src="second_image_url" />
    `
    ui = new HigherOrLowerUI()
  })

  describe('Testing function "updateUIAfterGuess"', () => {
    test('updateUIAfterGuess updates the first artist options values to the second ones, and the second one gets a completely new artist', () => {
      // Create a new artist object simulating getting a completely new artist
      const newOption = {
        name: 'Third New Artist',
        followers: { total: 1500 },
        images: [{ url: 'third_image_url' }]
      }

      // Check the initial values
      expect(ui.firstOptionNameElement.textContent).toBe('First Artist Name')
      expect(ui.firstOptionValueElement.textContent).toBe('500')
      expect(ui.firstOptionImageElement.src).toBe('http://localhost/first_image_url')

      expect(ui.secondOptionNameElement.textContent).toBe('Second Artist Name')
      expect(ui.secondOptionValueElement.textContent).toBe('1000')
      expect(ui.secondOptionImageElement.src).toBe('http://localhost/second_image_url')

      // Call the function to update the UI
      ui.updateUIAfterGuess(newOption)

      // Check the updated values
      expect(ui.firstOptionNameElement.textContent).toBe('Second Artist Name')
      expect(ui.firstOptionValueElement.textContent).toBe('1000')
      expect(ui.firstOptionImageElement.src).toBe('http://localhost/second_image_url')

      expect(ui.secondOptionNameElement.textContent).toBe(newOption.name)
      expect(ui.secondOptionValueElement.textContent).toBe(newOption.followers.total.toString())
      expect(ui.secondOptionImageElement.src).toBe('http://localhost/third_image_url')
    })
  })

  describe('Testing function "hideButtonsShowSecondValue"', () => {
    test('hideButtonsShowSecondValue hides buttons and shows the hidden value of the second option', () => {
      ui.hideButtonsShowSecondValue()

      expect(ui.buttons.style.display).toBe('none')
      expect(ui.secondOptionValueElement.style.display).toBe('block')
    })
  })
})
