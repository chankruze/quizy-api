/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 16:20:45 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as express from 'express'
import QuizzesDAO from '../dao/quizzesDAO'

const router = express.Router()

router.get('/all', async (req, res) => {
  try {
    const quizzes = await QuizzesDAO.getAllQuizzes()

    res.status(200).json({
      message: 'Quizzes fetched successfully',
      quizzes
    })
  } catch (e) {
    res.status(500).json({
      message: 'Error fetching quizzes',
      error: e
    })
  }
})

router.post('/new', async (req, res) => {
  try {
    const { title } = req.body

    if (!title) {
      throw new Error('Title not provided')
    }

    const _id = await QuizzesDAO.addOneQuiz(req.body)

    return res.status(201).json({
      message: 'Quiz added successfully',
      data: {
        _id
      }
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error adding lesson',
      error: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: 'Invalid request',
        error: "id can't be empty"
      })
    }

    const quiz = await QuizzesDAO.getOneQuizByID(req.params.id)

    return res.status(200).json({
      message: 'Quizzes fetched successfully',
      quiz
    })
  } catch (e) {
    return res.status(500).json({
      message: 'Error fetching quiz',
      error: e
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: 'Invalid request',
        error: "id can't be empty"
      })
    }

    if (!req.body._id) {
      return res.status(400).send({
        message: 'Invalid request',
        error: "quiz _id can't be empty"
      })
    }

    const quiz = await QuizzesDAO.updateOneQuiz(req.body)

    return res.status(200).json({
      message: 'Quiz updated successfully',
      quiz: quiz
    })
  } catch (e) {
    return res.status(500).json({
      message: 'Error updating quiz',
      error: e
    })
  }
})

export default router
