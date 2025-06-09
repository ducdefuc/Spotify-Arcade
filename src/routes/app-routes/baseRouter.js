// src/routes/app-routes/baseRouter.js

import express from 'express'
import { router as homeRouter } from './homeRouter.js'
import { router as userRouter } from './userRouter.js'
import { router as gameRouter } from '../game-routes/gameRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/user', userRouter)
router.use('/games', gameRouter)
