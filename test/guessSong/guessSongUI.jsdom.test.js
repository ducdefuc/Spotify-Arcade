// test/guessSong/guessSongUI.jsdom.test.js

import { GuessSongUI } from '../../public/js/guessSong/guessSongUI.js'

describe('Testing GuessSongUI', () => {
  let ui

  beforeEach(() => {
    document.body.innerHTML = `
      <img id="songImage" src="original_song_image" />
      <button id="playPauseButton">Play</button>
      <button id="submitGuess" disabled>Submit Guess</button>
      <input id="guessInput" value=""/>
      <div id="randomSongUri" style="display: none;">fakeSongUri</div>
      <div id="randomSongName" style="display: none;">fakeSongName</div>
    `

    ui = new GuessSongUI()
  })

  describe('Testing function "updateSong"', () => {
    test('updateSong updates the song in the UI', () => {
      // Create a new song object simulating getting a completely new song
      const newSong = {
        uri: 'newSongUri',
        name: 'newSongName',
        album: {
          images: [{ url: 'newImageUrl' }]
        }
      }

      ui.updateSong(newSong)

      expect(ui.randomSongUri).toBe(newSong.uri)
      expect(ui.randomSongName).toBe(newSong.name)
      expect(ui.songImageElement.src).toBe('http://localhost/newImageUrl')
      expect(ui.guessInput.value).toBe('')
      expect(ui.submitGuessButton.disabled).toBe(false)
      expect(ui.playPauseButton.textContent).toBe('Play')
      expect(ui.isPaused).toBe(true)
    })

    test('Handles cases where images are not available', () => {
      const newSong = {
        uri: 'newUri',
        name: 'newName',
        album: {
          images: []
        }
      }

      ui.updateSong(newSong)

      expect(ui.randomSongUri).toBe(newSong.uri)
      expect(ui.randomSongName).toBe(newSong.name)
      expect(ui.songImageElement.src).toBe('http://localhost/images/noimage.png')
      expect(ui.guessInput.value).toBe('')
      expect(ui.submitGuessButton.disabled).toBe(false)
      expect(ui.playPauseButton.textContent).toBe('Play')
      expect(ui.isPaused).toBe(true)
    })
  })

  describe('togglePlayPause', () => {
    // intital state is paused
    test('should toggle play/pause button text and flag', () => {
      // click play button
      ui.togglePlayPause()
      expect(ui.playPauseButton.textContent).toBe('Pause')
      expect(ui.isPaused).toBe(false)

      // click pause button
      ui.togglePlayPause()
      expect(ui.playPauseButton.textContent).toBe('Resume')
      expect(ui.isPaused).toBe(true)

      // click Resume button
      ui.togglePlayPause()
      expect(ui.playPauseButton.textContent).toBe('Pause')
      expect(ui.isPaused).toBe(false)
    })
  })
})
