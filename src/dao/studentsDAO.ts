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
   * @param {number} semester
   * @returns {Array<Student> | []} students | []
   */
  static async getAllStudentsBySemester (semester: number) {
    try {
      // Find students matching the "semester" parameter
      // project only the "name", "enrollmentNo" and "email" fields
      const cursor = await students.find(
        {
          semester
        },
        { projection: { _id: 0, semester: 0 } }
      )

      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} branch
   * @returns {Array<Student> | []} students | []
   */
  static async getAllStudentsByBranch (branch: string) {
    try {
      // Find students matching the "branch" parameter
      // project only the "name", "enrollmentNo" and "email" fields
      const cursor = await students.find(
        {
          branch
        },
        { projection: { _id: 0, branch: 0 } }
      )

      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} branch
   * @param {number} semester
   * @returns {Array<Student> | []} students | []
   */
  static async getAllStudentsByBranchAndSemester (
    branch: string,
    semester: number
  ) {
    try {
      // Find students matching the "semester" and "branch" parameter
      // project only the "name", "enrollmentNo" and "email" fields
      const cursor = await students.find(
        {
          branch,
          semester
        },
        { projection: { _id: 0, branch: 0, semester: 0 } }
      )

      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} regdNo
   * @returns {Student | null} student | null
   */
  static async getOneStudentByRegdNo (regdNo: string) {
    try {
      // Find a particular student matching the "enrollmentNo" parameter
      // project with all fields
      return await students.findOne({
        'bioData.regdNo': regdNo
      })
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /**
   * @param {string} email
   * @returns {Student | null} student | null
   */
  static async getOneStudentByEmail (email: string) {
    try {
      return await students.findOne({
        'bioData.email': email
      })
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /**
   * @param {string} studentId
   * @returns {Student | null} student | null
   */
  static async getOneStudentByID (studentId: string) {
    try {
      return await students.findOne({ _id: studentId })
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
            ...bioData
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
            verified: status
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
