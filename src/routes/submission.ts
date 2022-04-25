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

    const submission = await SubmissionsDAO.getOneSubmission(
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

export default router
