// test/higherorlower/scoreSystem.jsdom.test.js

import { ScoreSystem } from '../public/js/scoreSystem.js'

describe('Testing ScoreSystem', () => {
  let scoreSystem

  beforeEach(() => {
    // Set up the DOM element for score
    document.body.innerHTML = '<div id="score">Score: 0</div>'
    scoreSystem = new ScoreSystem()
  })

  describe('Testing function "addScore"', () => {
    test('addScore increases the score by 1 and updates the DOM', () => {
      scoreSystem.addScore()
      expect(scoreSystem.getScore()).toBe(1)
      expect(document.getElementById('score').textContent).toBe('Score: 1')

      scoreSystem.addScore()
      expect(scoreSystem.getScore()).toBe(2)
      expect(document.getElementById('score').textContent).toBe('Score: 2')
    })
  })

  describe('Testing function "resetScore"', () => {
    test('resetScore sets the score to 0 and updates the DOM', () => {
      scoreSystem.addScore()
      scoreSystem.addScore()
      expect(scoreSystem.getScore()).toBe(2)

      scoreSystem.resetScore()
      expect(scoreSystem.getScore()).toBe(0)
      expect(document.getElementById('score').textContent).toBe('Score: 0')
    })
  })

  describe('Testing function "getScore"', () => {
    test('getScore returns the current score', () => {
      expect(scoreSystem.getScore()).toBe(0)

      scoreSystem.addScore()
      expect(scoreSystem.getScore()).toBe(1)

      scoreSystem.resetScore()
      expect(scoreSystem.getScore()).toBe(0)
    })
  })
})
