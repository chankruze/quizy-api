/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 07 2022 11:37:41 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as express from 'express'
import StudentsDAO from '../dao/studentsDAO'

const router = express.Router()

/**
 * Route serving a student by enrollment number
 * @name get/enrollment/:enrollmentNo
 */
router.get('/enrollment/:enrollmentNo', async (req, res) => {
  const student = await StudentsDAO.getStudentByEnrollmentNo(
    req.params.enrollmentNo.toUpperCase() // convert to uppercase
  )

  if (student) return res.json({ student })

  return res.status(404).json({ students: null, message: 'Student not found' })
})

/**
 * Route serving a list of students by branch and semester
 * @name get/branch/:branch/semester/:semester
 */
router.get('/branch/:branch/semester/:semester', async (req, res) => {
  if (!req.params.branch || !req.params.semester) {
    return res.status(400).json({ message: 'Invalid request' })
  }

  const students = await StudentsDAO.getAllStudentsByBranchAndSemester(
    req.params.branch.toUpperCase(), // convert to uppercase
    parseInt(req.params.semester) // convert to number
  )

  if (students) return res.json({ students })

  return res.status(404).json({ students: null, message: 'No students found' })
})

/**
 * Route serving a list of students by branch
 * @name get/branch/:branch
 */
router.get('/branch/:branch', async (req, res) => {
  if (!req.params.branch) {
    return res.status(400).json({ message: 'Invalid request' })
  }

  const students = await StudentsDAO.getAllStudentsByBranch(
    req.params.branch.toUpperCase() // convert to uppercase
  )

  if (students) return res.json({ students })

  return res.status(404).json({ students: null, message: 'No students found' })
})

/**
 * Route serving all students by semester
 * @name get/semester/:semester
 */
router.get('/semester/:semester', async (req, res) => {
  if (!req.params.semester) {
    return res.status(400).json({ message: 'Invalid request' })
  }

  const students = await StudentsDAO.getAllStudentsBySemester(
    parseInt(req.params.semester) // convert to number
  )

  if (students) return res.json({ students })

  return res.status(404).json({ students: null, message: 'No students found' })
})

export default router
