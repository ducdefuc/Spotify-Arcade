// src/routes/app-routes/userRouter.js

import express from 'express'
import { UserController } from '../../controllers/userController.js'
import { checkAccessToken } from '../../middleware/accessHandler.js'

export const router = express.Router()

const controller = new UserController()

router.get('/login', (req, res, next) => controller.login(req, res, next))

router.get('/callback', (req, res, next) => controller.handleCallback(req, res, next))

router.get('/profile', checkAccessToken, (req, res, next) => controller.loadProfile(req, res, next))

router.get('/logout', (req, res, next) => controller.logout(req, res, next))
