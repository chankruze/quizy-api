/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 16:20:45 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as express from 'express'
import lessons from '../../data/lesssons'

const router = express.Router()

router.get('/all', (req, res) => {
  res.json(lessons)
})

router.post('/add', (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      throw new Error('Title and content are not provided')
    }

    // TODO: add lesson to db

    return res.status(201).json({
      message: 'Lesson added successfully'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error adding lesson',
      error: error.message
    })
  }
})

export default router
