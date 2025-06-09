// js/guessSong/guessSongInitialize.js

import { GuessSongMechanics } from './guessSongMechanics.js'
import { GuessSongUI } from './guessSongUI.js'
import { initializeSpotifySDK } from './spotifyWebplaybackSDK.js'
import { ScoreSystem } from '../scoreSystem.js'

document.addEventListener('DOMContentLoaded', async () => {
  const scoreSystem = new ScoreSystem()
  const ui = new GuessSongUI()
  const mechanics = new GuessSongMechanics(scoreSystem)

  await initializeSpotifySDK(() => {
    ui.playPauseButton.addEventListener('click', async () => {
      try {
        // if the button text is 'Play', play the song preview
        if (ui.playPauseButton.textContent === 'Play') {
          await mechanics.playSongPreview(ui.randomSongUri)
          // if the song is paused, resume it
        } else if (ui.isPaused) {
          await mechanics.resumeSongPreview()
          // if the song is playing, pause it
        } else {
          await mechanics.pauseSongPreview()
        }
        ui.togglePlayPause()
      } catch (error) {
        // if the song has playback restrictions, fetch a new song
        if (error.status === 403) {
          console.log('This song has playback restrictions, skipping to a new song.')
          const newTrack = await mechanics.fetchNewTrack()
          ui.updateSong(newTrack)
        }
      }
    })

    ui.submitGuessButton.addEventListener('click', async () => {
      const userGuess = ui.guessInput.value
      if (!ui.isPaused) {
        await mechanics.pauseSongPreview()
      }
      if (mechanics.checkGuess(userGuess, ui.randomSongName)) {
        scoreSystem.addScore()
        const newTrack = await mechanics.fetchNewTrack()
        ui.updateSong(newTrack)
      } else {
        await mechanics.endGame(scoreSystem.getScore())
      }
    })
  })
})
