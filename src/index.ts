/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:31:00 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as dotenv from 'dotenv'
import app from './App'
import { MongoClient, MongoClientOptions } from 'mongodb'
import { banner } from './utils'
import StudentsDAO from './dao/studentsDAO'
import QuizzesDAO from './dao/quizzesDAO'
import UsersDAO from './dao/usersDAO'

// import env variables
dotenv.config()

let port: number = parseInt(process.env.PORT) || 6767

// mongo db connection
if (!process.env.DB_URI) {
  console.error('❌ DB_URI is not defined in .env file')
  console.error('⚠️ starting server without MongoDB connection')
  // start listening on port
  app.listen(port, banner(port)).on('error', (err) => {
    if (err.message.includes('EADDRINUSE')) {
      return app.listen(++port, banner(port))
    }
  })
} else {
  MongoClient.connect(process.env.DB_URI, {
    maxPoolSize: 100,
    readConcern: { level: 'majority' },
    w: 'majority',
    wtimeoutMS: 2500,
    connectTimeoutMS: 2500,
    retryWrites: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as MongoClientOptions)
    .catch((err) => {
      console.error(err.stack)
      process.exit(1)
    })
    .then(async (client) => {
      console.log('Connected to MongoDB 🔥🔥🔥')
      // TODO: inject mongo client
      await StudentsDAO.injectDB(client)
      await QuizzesDAO.injectDB(client)
      await UsersDAO.injectDB(client)
      // start listening on port
      app.listen(port, banner(port)).on('error', (err) => {
        if (err.message.includes('EADDRINUSE')) {
          return app.listen(++port, banner(port))
        }
      })
    })
}
