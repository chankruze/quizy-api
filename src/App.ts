/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:31:12 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as express from 'express'
import * as cors from 'cors'
import * as morgan from 'morgan'
import helmet from 'helmet'
// routes
import studentRoutes from './routes/student'
import quizRoutes from './routes/quiz'

class App {
  public app

  constructor () {
    this.app = express()
    this.useMiddlewares()
    this.mountRoutes()
  }

  private useMiddlewares (): void {
    this.app.use(helmet(), cors(), morgan('dev'), express.json())
  }

  private mountRoutes (): void {
    // mount routes
    this.app.use('/api/student', studentRoutes)
    this.app.use('/api/quiz', quizRoutes)
  }
}

export default new App().app
