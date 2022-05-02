/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 24 2022 12:47:07 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { ObjectId } from 'bson'
import { Submission } from '../types/submission'

let submissions

export default class SubmissionsDAO {
  static async injectDB (conn) {
    if (submissions) {
      return
    }
    try {
      submissions = await conn
        .db(process.env.BOSEDB_NS)
        .collection('submissions')
    } catch (e) {
      console.error(
        `Unable to establish collection handles in submissionsDAO: ${e}`
      )
    }
  }

  /***************************************************************************
   * CREATE METHDOS
   **************************************************************************/
  /**
   * @param {Submission} submission
   * @returns {Array<Submission> | []} submissions | []
   */
  static async addOneSubmission (submission: Submission) {
    try {
      const doc = await submissions.insertOne(submission)
      return doc.insertedId
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /***************************************************************************
   * READ METHDOS
   **************************************************************************/

  /**
   * @param {null}
   * @returns {number} submission count
   */
  static async countAllSubmissions () {
    try {
      return await submissions.countDocuments({})
    } catch (e) {
      console.error(e)
      return 0
    }
  }

  /**
   * @param {string} quizId
   * @returns {Array<MinifiedSubmission> | []} submissions | []
   */
  static async getAllSubmissionsOfAQuiz (quizId: string) {
    try {
      const cursor = await submissions
        .find(
          { quizId },
          {
            projection: {
              answers: 0
            }
          }
        )
        .sort({ date: -1 })

      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} studentId
   * @returns {Array<MinifiedSubmission> | []} submissions | []
   */
  static async getAllSubmissionsOfAStudent (studentId: string) {
    try {
      const cursor = await submissions
        .find(
          { studentId },
          {
            projection: {
              answers: 0
            }
          }
        )
        .sort({ date: -1 })

      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} submissionId
   * @returns {<Submission> | null} submission | null
   */
  static async getOneSubmissionByID (submissionId: string) {
    try {
      return await submissions.findOne({ _id: new ObjectId(submissionId) })
    } catch (e) {
      console.error(e)
      return []
    }
  }

  // /**
  //  * @param {string} quizId
  //  * @param {string} studentId
  //  * @returns {Array<Submission> | []} submissions | []
  //  */
  // static async getAllSubmissionsByQuizAndStudentID (
  //   quizId: string,
  //   studentId: string
  // ) {
  //   try {
  //     const cursor = await submissions.find({ studentId, quizId }).sort({ date: -1 })
  //
  //     return cursor.toArray()
  //   } catch (e) {
  //     console.error(e)
  //     return []
  //   }
  // }
}
