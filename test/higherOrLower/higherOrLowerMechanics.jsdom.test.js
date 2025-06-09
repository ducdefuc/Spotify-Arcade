// test/higherOrLower/higherOrLowerMechanics.jsdom.test.js

import { HigherOrLowerMechanics } from '../../public/js/higherOrLower/higherOrLowerMechanics'
import { ScoreSystem } from '../../public/js/scoreSystem'

describe('Testing HigherOrLowerMechanics', () => {
  let mechanics
  let scoreSystem
  let originalLocation

  beforeEach(() => {
    scoreSystem = new ScoreSystem()
    mechanics = new HigherOrLowerMechanics(scoreSystem)

    // Mock the global fetch function.
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        /**
         * Mock the json function of the response.
         *
         * @returns {Promise} The promise with the mock data.
         */
        json: () => Promise.resolve({})
      })
    )

    // Save the original window.location
    originalLocation = window.location

    // Mock window.location
    delete window.location
    window.location = { href: '' }
  })

  afterEach(() => {
    // Clear the mock after each test
    fetch.mockClear()
    // Reset to the original window.location
    window.location = originalLocation
  })

  describe('Testing function "checkGuess"', () => {
    test('checkGuess returns true for correct higher guess', async () => {
      const firstOptionsValue = 10
      const secondOptionsValue = 20
      const isHigherGuess = true
      const result = await mechanics.checkGuess(firstOptionsValue, secondOptionsValue, isHigherGuess)
      expect(result).toBe(true)
    })

    test('checkGuess returns false for incorrect higher guess', async () => {
      const firstOptionsValue = 20
      const secondOptionsValue = 10
      const isHigherGuess = true
      const result = await mechanics.checkGuess(firstOptionsValue, secondOptionsValue, isHigherGuess)
      expect(result).toBe(false)
    })

    test('checkGuess returns true for correct lower guess', async () => {
      const firstOptionsValue = 20
      const secondOptionsValue = 10
      const isHigherGuess = false
      const result = await mechanics.checkGuess(firstOptionsValue, secondOptionsValue, isHigherGuess)
      expect(result).toBe(true)
    })

    test('checkGuess returns false for incorrect lower guess', async () => {
      const firstOptionsValue = 10
      const secondOptionsValue = 20
      const isHigherGuess = false
      const result = await mechanics.checkGuess(firstOptionsValue, secondOptionsValue, isHigherGuess)
      expect(result).toBe(false)
    })

    test('checkGuess returns true for equal values (guessing higher)', async () => {
      const firstOptionsValue = 10
      const secondOptionsValue = 10
      const isHigherGuess = true
      const result = await mechanics.checkGuess(firstOptionsValue, secondOptionsValue, isHigherGuess)
      expect(result).toBe(true)
    })

    test('checkGuess returns true for equal values (guessing lower)', async () => {
      const firstOptionsValue = 10
      const secondOptionsValue = 10
      const isHigherGuess = false
      const result = await mechanics.checkGuess(firstOptionsValue, secondOptionsValue, isHigherGuess)
      expect(result).toBe(true)
    })
  })

  describe('Testing function "fetchNewArtist"', () => {
    test('fetchNewArtist returns a new artist object', async () => {
      const mockArtist = { name: 'New Artist', followers: { total: 1000 } }
      fetch.mockImplementation(() =>
        Promise.resolve({
          /**
           * Mock the json function of the response.
           *
           * @returns {Promise} The promise with the mock artist object.
           */
          json: () => Promise.resolve(mockArtist)
        })
      )

      const newArtist = await mechanics.fetchNewArtist()
      expect(newArtist).toBeDefined()
      expect(newArtist).toHaveProperty('name')
      expect(newArtist).toHaveProperty('followers')
    })
  })

  describe('Testing function "endGame"', () => {
    test('endGame should post the current score, reset the score system and redirect to gameover page', async () => {
      const currentScore = 10
      fetch.mockImplementation(() =>
        Promise.resolve({
          ok: true
        })
      )
      // Mock the resetScore function
      scoreSystem.resetScore = jest.fn()

      await mechanics.endGame(currentScore)

      expect(fetch).toHaveBeenCalledWith(
        '/spotify-arcade/games/gameover/higherorlower',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ score: currentScore })
        })
      )
      expect(scoreSystem.resetScore).toHaveBeenCalled()
      expect(window.location.href).toBe(`/spotify-arcade/games/gameover/view/higherorlower?score=${currentScore}`)
    })
  })
})
