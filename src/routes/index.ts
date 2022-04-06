/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:43:14 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  })
})

export default router
