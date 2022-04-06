/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:31:00 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as dotenv from 'dotenv'
import app from './App'
import { MongoClient, MongoClientOptions } from 'mongodb'
import { banner } from './utils'

// import env variables
dotenv.config()

let port: number = parseInt(process.env.PORT) || 6767

// mongo db
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
    // start listening on port
    app.listen(port, banner(port)).on('error', (err) => {
      if (err.message.includes('EADDRINUSE')) {
        return app.listen(++port, banner(port))
      }
    })
  })
