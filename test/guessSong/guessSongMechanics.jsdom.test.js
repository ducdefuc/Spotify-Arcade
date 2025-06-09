// test/guessSong/guessSongMechanics.jsdom.test.js

import { GuessSongMechanics } from '../../public/js/guessSong/guessSongMechanics'
import { ScoreSystem } from '../../public/js/scoreSystem'

describe('Testing GuessSongMechanics', () => {
  let mechanics
  let scoreSystem
  let originalLocation

  beforeEach(() => {
    scoreSystem = new ScoreSystem()
    mechanics = new GuessSongMechanics(scoreSystem)
    window.spotifyDeviceId = 'fakeDeviceId'
    window.spotifyAccessToken = 'fakeAccessToken'

    // Mock the global fetch function
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

    // Restore the original window.location
    window.location = originalLocation
  })

  describe('Testing function "playSongPreview"', () => {
    test('playSongPreview should call the play Spotify API endpoint', async () => {
      const trackUri = 'fakeTrackUri'

      await mechanics.playSongPreview(trackUri)
      expect(fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/player/play?device_id=fakeDeviceId',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ uris: [trackUri] }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer fakeAccessToken'
          }
        })
      )
    })
  })

  describe('Testing function "pauseSongPreview"', () => {
    test('pauseSongPreview should call the pause Spotify API endpoint', async () => {
      await mechanics.pauseSongPreview()
      expect(fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/player/pause?device_id=fakeDeviceId',
        expect.objectContaining({
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer fakeAccessToken'
          }
        })
      )
    })
  })

  describe('Testing function "resumeSongPreview"', () => {
    test('resumeSongPreview should call the resume Spotify API endpoint', async () => {
      await mechanics.resumeSongPreview()
      expect(fetch).toHaveBeenCalledWith(
        'https://api.spotify.com/v1/me/player/play?device_id=fakeDeviceId',
        expect.objectContaining({
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer fakeAccessToken'
          }
        })
      )
    })
  })

  describe('Testing function "checkGuess"', () => {
    test('checkGuess returns true for correct user guess using the exact same string', () => {
      const userGuess = 'someFakeSongName'
      const correctSongName = 'someFakeSongName'
      const result = mechanics.checkGuess(userGuess, correctSongName)
      expect(result).toBe(true)
    })

    test('checkGuess returns true for correct user guess using the same string but in all lowercase', () => {
      const userGuess = 'somefakesongname'
      const correctSongName = 'someFakeSongName'
      const result = mechanics.checkGuess(userGuess, correctSongName)
      expect(result).toBe(true)
    })

    test('checkGuess returns true for correct user guess using the same string but in all uppercase', () => {
      const userGuess = 'SOMEFAKESONGNAME'
      const correctSongName = 'someFakeSongName'
      const result = mechanics.checkGuess(userGuess, correctSongName)
      expect(result).toBe(true)
    })

    test('checkGuess returns true for correct user guess without special characters', () => {
      const userGuess = 'fakesong'
      const correctSongName = 'fake-song'
      const result = mechanics.checkGuess(userGuess, correctSongName)
      expect(result).toBe(true)
    })

    test('checkGuess returns true for correct user guess without space characters', () => {
      const userGuess = 'fakesong'
      const correctSongName = 'fake song'
      const result = mechanics.checkGuess(userGuess, correctSongName)
      expect(result).toBe(true)
    })

    test('checkGuess returns true for correct user guess with space characters', () => {
      const userGuess = 'fake song'
      const correctSongName = 'fakesong'
      const result = mechanics.checkGuess(userGuess, correctSongName)
      expect(result).toBe(true)
    })

    test('checkGuess returns false for incorrect user guess', () => {
      const userGuess = 'Wrong Guess'
      const correctSongName = 'someFakeSongName'
      const result = mechanics.checkGuess(userGuess, correctSongName)
      expect(result).toBe(false)
    })
  })

  describe('Testing function "fetchNewTrack"', () => {
    test('fetchTrack returns a new track object', async () => {
      const mockTrack = { name: 'New Fake Track Name', uri: 'fakeNewTrackUri' }
      fetch.mockImplementation(() =>
        Promise.resolve({
          /**
           * Mock the json function of the response.
           *
           * @returns {Promise} The promise with the mock track object.
           */
          json: () => Promise.resolve(mockTrack)
        })
      )

      const newTrack = await mechanics.fetchNewTrack()
      expect(newTrack).toBeDefined()
      expect(newTrack).toHaveProperty('name')
      expect(newTrack).toHaveProperty('uri')
    })
  })

  describe('Testing function "endGame"', () => {
    test('endGame should post the current score and reset the score system and redirect to gameover page', async () => {
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
        '/spotify-arcade/games/gameover/guess-song',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ score: currentScore })
        })
      )

      expect(scoreSystem.resetScore).toHaveBeenCalled()
      expect(window.location.href).toBe(`/spotify-arcade/games/gameover/view/guess-song?score=${currentScore}`)
    })
  })
})
