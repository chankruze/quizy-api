/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 24 2022 12:49:49 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as express from 'express'
import SubmissionsDAO from '../dao/submissionsDAO'

const router = express.Router()

/***************************************************************************
 * CREATE ROUTES
 **************************************************************************/

router.post('/quiz/:quizId', async (req, res) => {
  try {
    if (!req.params.quizId) {
      throw new Error('Quiz ID not provided')
    }

    const _id = await SubmissionsDAO.addOneSubmission(req.body)

    return res.status(201).json({
      message: 'Quiz submitted successfully',
      submissionId: _id
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error submitting quiz',
      error: error.message
    })
  }
})

/***************************************************************************
 * READ ROUTES
 **************************************************************************/

router.get('/:submissionId', async (req, res) => {
  try {
    if (!req.params.submissionId) {
      throw new Error('Submission ID not provided')
    }

    const submission = await SubmissionsDAO.getOneSubmissionByID(
      req.params.submissionId
    )

    return res.json(submission)
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching submission',
      error: error.message
    })
  }
})

router.get('/student/:studentId', async (req, res) => {
  try {
    if (!req.params.studentId) {
      throw new Error('Student ID not provided')
    }

    const submissions = await SubmissionsDAO.getAllSubmissionsOfAStudent(
      req.params.studentId
    )

    // TODO: get the quiz by
    // const quizIds = new Set(submissions.map((submission) => submission.quizId))
    // console.log(quizIds)

    // TODO: calulate score
    // TODO: Add pagination

    return res.json(submissions)
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching submission',
      error: error.message
    })
  }
})

router.get('/quiz/:quizId/student/:studentId', async (req, res) => {
  try {
    if (!req.params.quizId) {
      throw new Error('Quiz ID not provided')
    }

    if (!req.params.studentId) {
      throw new Error('Student ID not provided')
    }

    const submissions =
      await SubmissionsDAO.getAllSubmissionsByQuizAndStudentID(
        req.params.quizId,
        req.params.studentId
      )

    return res.json(submissions)
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching submission',
      error: error.message
    })
  }
})

router.get('/quiz/:quizId', async (req, res) => {
  try {
    if (!req.params.quizId) {
      throw new Error('Quiz ID not provided')
    }

    const quizzes = await SubmissionsDAO.getAllSubmissionsOfAQuiz(
      req.params.quizId
    )

    return res.status(201).json(quizzes)
  } catch (error) {
    return res.status(500).json({
      message: 'Error submitting quiz',
      error: error.message
    })
  }
})

router.get('/quiz/:quizId/minified', async (req, res) => {
  try {
    if (!req.params.quizId) {
      throw new Error('Quiz ID not provided')
    }

    const quizzes = await SubmissionsDAO.getAllMinifiedSubmissionsOfAQuiz(
      req.params.quizId
    )

    return res.status(201).json(quizzes)
  } catch (error) {
    return res.status(500).json({
      message: 'Error submitting quiz',
      error: error.message
    })
  }
})

/**
 * Route serving total submissions count by email
 * @name get/all/count
 */
router.get('/all/count', async (req, res) => {
  try {
    const count = await SubmissionsDAO.countAllSubmissions()

    res.status(200).json({
      count
    })
  } catch (e) {
    res.status(500).json({
      message: 'Error fetching submission count',
      error: e
    })
  }
})

/***************************************************************************
 * DELETE ROUTES
 **************************************************************************/

router.delete('/:submissionId', async (req, res) => {
  try {
    if (!req.params.submissionId) {
      throw new Error('Submission ID not provided')
    }

    const deletedCount = await SubmissionsDAO.deleteOneQuiz(
      req.params.submissionId
    )

    if (deletedCount === 1) {
      return res.json({ message: 'Submission deleted' })
    }

    return res.status(404).json({ message: 'Submission not found' })
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting submission',
      error: error.message
    })
  }
})

export default router
