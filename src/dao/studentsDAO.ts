/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 07 2022 11:50:07 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

// import { ObjectId } from 'bson'

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

  /**
   * @param {number} semester
   * @returns {Array<Student>}
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
   * @returns {Array<Student>}
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
   * @returns {Array<Student>}
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
   * @param {string} enrollmentNo
   * @returns {Student}
   */
  static async getStudentByEnrollmentNo (enrollmentNo: string) {
    try {
      // Find a particular student matching the "enrollmentNo" parameter
      // project with all fields
      return await students.findOne({ enrollmentNo })
    } catch (e) {
      console.error(e)
      return []
    }
  }
}
