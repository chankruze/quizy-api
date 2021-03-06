/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 16:20:45 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as express from 'express'
import QuizzesDAO from '../dao/quizzesDAO'
import StudentsDAO from '../dao/studentsDAO'
import { sendQuizNotification } from '../utils/sendQuizNotification'

const router = express.Router()

/***************************************************************************
 * CREATE ROUTES
 **************************************************************************/

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

router.post('/:id/notify', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: 'Invalid request',
        error: "quiz id can't be empty"
      })
    }

    const quiz = await QuizzesDAO.getOneMinifiedQuizByID(req.params.id)
    const students = await StudentsDAO.getAllStudentsByBranchAndSemester(
      quiz.branch,
      quiz.semester,
      {
        _id: 0,
        email: '$bioData.email'
      }
    )

    // convert students object list to email array
    const recipients = students.map((student) => student.email)

    // send email to students
    await sendQuizNotification(recipients, quiz)

    return res.status(201).json({
      message: 'Quiz notification sent successfully'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Error sending quiz notification',
      error: error.message
    })
  }
})

/***************************************************************************
 * READ ROUTES
 **************************************************************************/

router.get('/all', async (req, res) => {
  try {
    const quizzes = await QuizzesDAO.getAllQuizzes()

    res.status(200).json(quizzes)
  } catch (e) {
    res.status(500).json({
      message: 'Error fetching quizzes',
      error: e
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

    return res.status(200).json(quiz)
  } catch (e) {
    return res.status(500).json({
      message: 'Error fetching quiz',
      error: e
    })
  }
})

router.get('/:id/live', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: 'Invalid request',
        error: "id can't be empty"
      })
    }

    const quiz = await QuizzesDAO.getOneQuizByID(req.params.id)

    // trim the answer form each question
    quiz.questions = quiz.questions.map((question) => {
      const { answer, ...rest } = question
      return rest
    })

    return res.status(200).json(quiz)
  } catch (e) {
    return res.status(500).json({
      message: 'Error fetching quiz',
      error: e
    })
  }
})

router.get('/:id/minified', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: 'Invalid request',
        error: "id can't be empty"
      })
    }

    const quiz = await QuizzesDAO.getOneMinifiedQuizByID(req.params.id)

    return res.status(200).json(quiz)
  } catch (e) {
    return res.status(500).json({
      message: 'Error fetching quiz',
      error: e
    })
  }
})

router.get('/all/semester/:semester/branch/:branch', async (req, res) => {
  try {
    if (!req.params.semester) {
      return res.status(400).send({
        message: 'Invalid request',
        error: 'semester not provided'
      })
    }

    if (!req.params.branch) {
      return res.status(400).send({
        message: 'Invalid request',
        error: 'branch not provided'
      })
    }

    const quizzes = await QuizzesDAO.getAllQuizzesBySemesterAndBranch(
      req.params.semester,
      req.params.branch
    )

    return res.status(200).json(quizzes)
  } catch (e) {
    return res.status(500).json({
      message: 'Error fetching quiz',
      error: e
    })
  }
})

router.get('/all/count', async (req, res) => {
  try {
    const count = await QuizzesDAO.countAllQuizzes()

    res.status(200).json({ count })
  } catch (e) {
    res.status(500).json({
      message: 'Error fetching quizzes count',
      error: e
    })
  }
})

/**
 * Route serves x upcoming quizzes
 * @name get/upcoming/:count
 */
router.get('/upcoming/:count', async (req, res) => {
  try {
    const quizzes = await QuizzesDAO.getUpcomingQuizzes(
      parseInt(req.params.count)
    )
    res.status(200).json(quizzes)
  } catch (e) {
    res.status(500).json({
      message: 'Error fetching quizzes count',
      error: e
    })
  }
})

/***************************************************************************
 * UPDATE ROUTES
 **************************************************************************/

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

/***************************************************************************
 * DELETE ROUTES
 **************************************************************************/

router.delete('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: 'Invalid request',
        error: "id can't be empty"
      })
    }

    const deletedCount = await QuizzesDAO.deleteOneQuiz(req.params.id)

    if (deletedCount === 1) {
      return res.json({ message: 'Quiz deleted' })
    }

    return res.status(404).json({ message: 'Quiz not found' })
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting quiz',
      error
    })
  }
})

export default router
