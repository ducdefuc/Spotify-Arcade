// js/guessSong/guessSongUI.js

/**
 * Class representing the UI for the Guess the Song game.
 */
export class GuessSongUI {
  /**
   * Constructor for the GuessSongUI.
   */
  constructor () {
    this.playPauseButton = document.getElementById('playPauseButton')
    this.submitGuessButton = document.getElementById('submitGuess')
    this.guessInput = document.getElementById('guessInput')
    this.scoreElement = document.getElementById('score')
    this.songImageElement = document.getElementById('songImage')

    this.randomSongUri = document.getElementById('randomSongUri').textContent
    this.randomSongName = document.getElementById('randomSongName').textContent
    this.isPaused = true
  }

  /**
   * Update the song information in the UI.
   *
   * @param {object} newSong - The song object to display.
   */
  updateSong (newSong) {
    this.randomSongUri = newSong.uri
    this.randomSongName = newSong.name
    this.songImageElement.src = newSong.album.images[0] ? newSong.album.images[0].url : '../images/noimage.png'
    this.guessInput.value = ''
    this.submitGuessButton.disabled = false
    this.playPauseButton.textContent = 'Play' // Reset button text
    this.isPaused = true // Reset flag
  }

  /**
   * Toggle play/pause button text and flag.
   */
  togglePlayPause () {
    if (this.isPaused) {
      this.playPauseButton.textContent = 'Pause'
    } else {
      this.playPauseButton.textContent = 'Resume'
    }
    this.isPaused = !this.isPaused // Flip state of flag
  }
}
