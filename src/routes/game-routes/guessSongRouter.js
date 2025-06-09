// src/routes/game-routes/guessSongRouter.js

import express from 'express'
import { container, TYPES } from '../../config/inversify.js'
import { checkAccessToken } from '../../middleware/accessHandler.js'

export const router = express.Router()

const controller = container.get(TYPES.GuessSongController)

router.get('/', checkAccessToken, (req, res, next) => controller.index(req, res, next))

router.get('/token', checkAccessToken, (req, res, next) => controller.getAccessToken(req, res, next))

router.get('/getnewtrack', checkAccessToken, (req, res, next) => controller.getNewTrack(req, res, next))
