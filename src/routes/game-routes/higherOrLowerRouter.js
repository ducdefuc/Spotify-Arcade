// src/routes/game-routes/higherOrLowerRouter.js

import express from 'express'
import { container, TYPES } from '../../config/inversify.js'
import { checkAccessToken } from '../../middleware/accessHandler.js'

export const router = express.Router()

const controller = container.get(TYPES.HigherOrLowerController)

router.get('/', checkAccessToken, (req, res, next) => controller.index(req, res, next))

router.get('/getnewartist', checkAccessToken, (req, res, next) => controller.getNewArtist(req, res, next))
