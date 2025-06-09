// src/config/inversify.js

import { Container, decorate, inject, injectable } from 'inversify'
import { SpotifyService } from '../services/spotifyService.js'
import { HigherOrLowerController } from '../controllers/gameControllers/higherOrLowerController.js'
import { GuessSongController } from '../controllers/gameControllers/guessSongController.js'

export const TYPES = {
  SpotifyService: Symbol.for('SpotifyService'),
  HigherOrLowerController: Symbol.for('HigherOrLowerController'),
  GuessSongController: Symbol.for('GuessSongController')
}

decorate(injectable(), SpotifyService)
decorate(injectable(), HigherOrLowerController)
decorate(injectable(), GuessSongController)

decorate(inject(TYPES.SpotifyService), HigherOrLowerController, 0)
decorate(inject(TYPES.SpotifyService), GuessSongController, 0)

export const container = new Container()

container.bind(TYPES.SpotifyService).to(SpotifyService).inSingletonScope()
container.bind(TYPES.HigherOrLowerController).to(HigherOrLowerController).inSingletonScope()
container.bind(TYPES.GuessSongController).to(GuessSongController).inSingletonScope()
