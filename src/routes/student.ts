/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 07 2022 11:37:41 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as express from 'express'
import StudentsDAO from '../dao/studentsDAO'
import { Student } from '../types/student'

const router = express.Router()

/***************************************************************************
 * GET ROUTES
 **************************************************************************/

/**
 * Route serves all students
 * @name get/all
 */
router.get('/all', async (req, res) => {
  const students = await StudentsDAO.getAllStudents()

  if (students) return res.json({ students })

  return res.status(404).json({ students: null, message: 'No students found' })
})

/**
 * Route serves all students
 * @name get/all/verification/:verification
 */
router.get('/all/verification/:verification', async (req, res) => {
  const students = await StudentsDAO.getAllStudentsByVerificationStatus(
    req.params.verification
  )

  if (students) return res.json([...students])

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
 * Route serving a student by email
 * @name get/email/:email
 */
router.get('/email/:email', async (req, res) => {
  const student = await StudentsDAO.getOneStudentByEmail(req.params.email)

  if (student) return res.json({ ...student })

  return res.status(404).json({ message: 'Student not found' })
})

/**
 * Route serving a student by enrollment number
 * @name get/registration/:registrationNo
 */
router.get('/registration/:registrationNo', async (req, res) => {
  const student = await StudentsDAO.getOneStudentByRegdNo(
    req.params.registrationNo.toUpperCase() // convert to uppercase
  )

  if (student) return res.json({ student })

  return res.status(404).json({ students: null, message: 'Student not found' })
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

/***************************************************************************
 * POST ROUTES
 **************************************************************************/

/**
 * Route creating a student from bio data
 * @name post/new
 */
router.post('/new', async (req, res) => {
  try {
    const { regdNo } = req.body

    if (!regdNo) {
      return res
        .status(400)
        .json({ message: 'Registration number not provided' })
    }

    // find student by regdNo
    const student: Student = await StudentsDAO.getOneStudentByRegdNo(regdNo)

    if (!student) {
      const _id = await StudentsDAO.addOneStudent({
        bioData: { ...req.body },
        verification: 'pending'
      })

      return res.status(201).json({
        message: 'Bio data submited successfully & awaiting verification',
        data: {
          _id
        }
      })
    }

    return res.status(409).json({
      message: `${regdNo} is already associated with ${student.bioData.name}`
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: error.stack
    })
  }
})

/***************************************************************************
 * UPDATE ROUTES
 **************************************************************************/

/**
 * Route updates a student's bio data by its id
 * @name put/:id/biodata
 */
router.put('/:id/biodata', async (req, res) => {
  if (!req.body.regdNo) {
    return res.status(400).json({ message: 'Registration number not provided' })
  }

  const modifiedCount = await StudentsDAO.updateBioData(req.params.id, req.body)

  if (modifiedCount === 1) {
    return res.json({ message: 'Biodata updated' })
  }

  return res.status(404).json({ message: 'Student not found' })
})

/**
 * Route updates a student's verification status by id
 * @name put/:id/verify
 */
router.put('/:id/verify', async (req, res) => {
  if (!req.body.verified) {
    return res.status(400).json({ message: "verified status can't be empty" })
  }

  const modifiedCount = await StudentsDAO.updateVerificationStatus(
    req.params.id,
    req.body.verification
  )

  if (modifiedCount === 1) {
    return res.json({ message: `Student ${req.body.verification}` })
  }

  return res.status(404).json({ message: 'Student not found' })
})

/***************************************************************************
 * DELETE ROUTES
 **************************************************************************/

/**
 * Route deletes a student by id
 * @name delete/:id
 */
router.delete('/:id', async (req, res) => {
  const deletedCount = await StudentsDAO.deleteOneStudent(req.params.id)

  if (deletedCount === 1) {
    return res.json({ message: 'Successfully deleted student.' })
  }

  return res.json({
    message: 'No students matched the query. Deleted 0 student.'
  })
})

export default router
