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

/**
 * Route serving a student by its id
 * @name get/:id
 */
router.get('/:id', async (req, res) => {
  const student = await StudentsDAO.getOneStudentByID(req.params.id)

  if (student) return res.json({ student })

  return res.status(404).json({ message: 'Student not found' })
})

/**
 * Route updates a student by its id
 * @name put/:id
 */
router.put('/:id', async (req, res) => {
  const modifiedCount = await StudentsDAO.updateOneStudent(req.body)

  if (modifiedCount === 1) {
    return res.json({ message: 'Student updated' })
  }

  return res.status(404).json({ message: 'Student not found' })
})

/**
 * Route verifies a student by enrollment number
 * @name put/:id/verify
 */
router.put('/:id/verify', async (req, res) => {
  const modifiedCount = await StudentsDAO.verifyOneStudent(req.params.id)

  if (modifiedCount === 1) {
    return res.json({ message: 'Student verified' })
  }

  return res.status(404).json({ message: 'Student not found' })
})

/**
 * Route verifies a student by enrollment number
 * @name delete/:id
 */
router.put('/:id', async (req, res) => {
  const deletedCount = await StudentsDAO.verifyOneStudent(req.params.id)

  if (deletedCount === 1) {
    return res.json({ message: 'Successfully deleted student.' })
  }

  return res.json({
    message: 'No students matched the query. Deleted 0 student.'
  })
})

export default router
