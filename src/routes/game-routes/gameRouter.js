// src/routes/game-routes/gameRouter.js

import express from 'express'
import { GameModeController } from '../../controllers/gameControllers/gameModeController.js'
import { checkAccessToken } from '../../middleware/accessHandler.js'
import { router as higherOrLowerRouter } from './higherOrLowerRouter.js'
import { router as guessSongRouter } from './guessSongRouter.js'

export const router = express.Router()

const gameMenuController = new GameModeController()

router.get('/', checkAccessToken, (req, res, next) => gameMenuController.index(req, res, next))

router.use('/higherorlower', higherOrLowerRouter)

router.post('/gameover/:gamemode', checkAccessToken, (req, res, next) => gameMenuController.handleScoreAtGameEnd(req, res, next))

router.get('/gameover/view/:gamemode', checkAccessToken, (req, res, next) => gameMenuController.renderGameOver(req, res, next))

router.use('/guess-song', guessSongRouter)
