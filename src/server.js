// src/server.js

import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import helmet from 'helmet'
import session from 'express-session'
import { router } from './routes/mainRouter.js'
import { errorHandler } from './middleware/errorHandler.js'
import { setAuthenticationStatus } from './middleware/accessHandler.js'
import { connectDB } from './config/mongoose.js'

dotenv.config()

try {
  await connectDB()
  const app = express()
  const port = process.env.PORT || 3030
  const baseUrl = process.env.BASE_URL || '/spotify-arcade/'

  const directoryFullName = dirname(fileURLToPath(import.meta.url))
  app.use(baseUrl, express.static(join(directoryFullName, '..', 'public')))

  app.set('view engine', 'ejs')
  app.set('views', join(directoryFullName, 'views'))

  // Setup and use session middleware
  const sessionOptions = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      sameSite: 'lax'
    }
  }
  app.use(express.json())
  app.use(session(sessionOptions))
  app.use(setAuthenticationStatus)

  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }))
  app.use(morgan('dev'))
  app.use(baseUrl, router)
  app.use(errorHandler)

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}${baseUrl}`)
  })
} catch (error) {
  console.error(error)
}
