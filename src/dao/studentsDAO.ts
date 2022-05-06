/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 07 2022 11:50:07 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { ObjectId } from 'bson'
import { BioData, Student } from '../types/student'

let students

export default class StudentsDAO {
  static async injectDB (conn) {
    if (students) {
      return
    }

    try {
      students = await conn.db(process.env.BOSEDB_NS).collection('students')
    } catch (e) {
      console.error(
        `Unable to establish collection handles in studentsDAO: ${e}`
      )
    }
  }

  /***************************************************************************
   * READ METHODS
   ***************************************************************************/

  /**
   * @param {null}
   * @param {any} projection
   * @returns {Array<Student> | []} students | []
   */
  static async getAllStudents (projection?: any) {
    try {
      const cursor = await students.find({}, { projection })

      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {null}
   * @returns {number} students count
   */
  static async countAllStudents () {
    try {
      return await students.countDocuments({})
    } catch (e) {
      console.error(e)
      return 0
    }
  }

  /**
   * @param {string} verification
   * @param {any} projection
   * @returns {Array<Student> | []} students | []
   */
  static async getAllStudentsByVerificationStatus (
    verification: string,
    projection?: any
  ) {
    try {
      // Find students matching the "verification" parameter
      const cursor = await students.find({ verification }, { projection })

      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} status
   * @returns {number} students count
   */
  static async countAllStudentsByVerificationStatus (status: string) {
    try {
      // Find students matching the "verification" parameter
      return await students.countDocuments({
        verification: status
      })
    } catch (e) {
      console.error(e)
      return 0
    }
  }

  /**
   * @param {string} semester
   * @param {any} projection
   * @returns {Array<Student> | []} students | []
   */
  static async getAllStudentsBySemester (semester: string, projection?: any) {
    try {
      // Find students matching the "semester" parameter
      const cursor = await students.find(
        { 'bioData.semester': semester },
        { projection }
      )

      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} branch
   * @param {any} projection
   * @returns {Array<Student> | []} students | []
   */
  static async getAllStudentsByBranch (branch: string, projection?: any) {
    try {
      // Find students matching the "branch" parameter
      const cursor = await students.find(
        { 'bioData.branch': branch },
        { projection }
      )

      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} branch
   * @param {string} semester
   * @param {any} projection
   * @returns {Array<Student> | []} students | []
   */
  static async getAllStudentsByBranchAndSemester (
    branch: string,
    semester: string,
    projection?: any
  ) {
    try {
      // Find students matching the "semester" and "branch" parameter
      const cursor = await students.find(
        {
          'bioData.branch': branch,
          'bioData.semester': semester
        },
        { projection }
      )

      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} regdNo
   * @param {any} projection
   * @returns {Student | null} student | null
   */
  static async getOneStudentByRegdNo (regdNo: string, projection?: any) {
    try {
      // Find a particular student matching the "enrollmentNo" parameter
      // project with all fields
      return await students.findOne(
        { 'bioData.regdNo': regdNo },
        { projection }
      )
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /**
   * @param {string} email
   * @param {any} projection
   * @returns {Student | null} student | null
   */
  static async getOneStudentByEmail (email: string, projection?: any) {
    try {
      return await students.findOne({ 'bioData.email': email }, { projection })
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /**
   * @param {string} studentId
   * @param {any} projection
   * @returns {Student | null} student | null
   */
  static async getOneStudentByID (studentId: string, projection?: any) {
    try {
      return await students.findOne(
        { _id: new ObjectId(studentId) },
        { projection }
      )
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /***************************************************************************
   * CREATE METHODS
   ***************************************************************************/

  /**
   * @param {Student} student
   * @returns {string | null} studentId | null
   */
  static async addOneStudent (student: Student) {
    try {
      const result = await students.insertOne(student)
      return result.insertedId
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /***************************************************************************
   * UPDATE METHODS
   **************************************************************************/

  /**
   * @param {Student} student
   * @returns {number} modifiedCount
   */
  static async updateBioData (userId: string, bioData: BioData) {
    try {
      const result = await students.updateOne(
        {
          _id: new ObjectId(userId)
        },
        {
          $set: {
            bioData,
            verification: 'pending'
          }
        }
      )
      return result.modifiedCount
    } catch (e) {
      console.error(e)
      return 0
    }
  }

  /**
   * @param {string} studentId
   * @returns {number} modifiedCount
   */
  static async updateVerificationStatus (studentId: string, status: boolean) {
    try {
      const result = await students.updateOne(
        {
          _id: new ObjectId(studentId)
        },
        {
          $set: {
            verification: status
          }
        }
      )
      return result.modifiedCount
    } catch (e) {
      console.error(e)
      return 0
    }
  }

  /***************************************************************************
   * DELETE METHODS
   ***************************************************************************/

  /**
   * @param {string} studentId
   * @returns {number} deletedCount
   */
  static async deleteOneStudent (studentId: string) {
    try {
      const result = await students.deleteOne({
        _id: new ObjectId(studentId)
      })

      return result.deletedCount
    } catch (e) {
      console.error(e)
      return 0
    }
  }
}
