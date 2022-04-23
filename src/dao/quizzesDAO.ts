/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 07 2022 13:02:40 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { ObjectId } from 'bson'
import { Quiz } from '../types/quiz'

let quizzes

export default class QuizzesDAO {
  static async injectDB (conn) {
    if (quizzes) {
      return
    }
    try {
      quizzes = await conn.db(process.env.BOSEDB_NS).collection('quizzes')
    } catch (e) {
      console.error(
        `Unable to establish collection handles in quizzesDAO: ${e}`
      )
    }
  }

  /***************************************************************************
   * READ METHODS
   **************************************************************************/

  /**
   * @param {null}
   * @returns {Array<Quiz> | []} quizzes | []
   */
  static async getAllQuizzes () {
    try {
      const cursor = await quizzes.find({})
      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {number} semester
   * @returns {Array<Quiz> | []} quizzes | []
   */
  static async getAllQuizzesBySemester (semester: number) {
    try {
      const cursor = await quizzes.find({
        semester
      })
      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} branch
   * @returns {Array<Quiz> | []} quizzes | []
   */
  static async getAllQuizzesByBranch (branch: string) {
    try {
      const cursor = await quizzes.find({
        branch
      })
      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} semester
   * @param {string} branch
   * @returns {Array<Quiz> | []} quizzes | []
   */
  static async getAllQuizzesBySemesterAndBranch (
    semester: string,
    branch: string
  ) {
    try {
      const cursor = await quizzes.find({
        semester,
        branch
      })
      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} title
   * @returns {Array<Quiz> | []} quizzes | []
   */
  static async getAllQuizzesByTitle (title: string) {
    try {
      const cursor = await quizzes.find({
        title
      })
      return cursor.toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {string} quizId
   * @returns {Quiz | null} quiz | null
   */
  static async getOneQuizByID (quizId: string) {
    try {
      return await quizzes.findOne({
        _id: new ObjectId(quizId)
      })
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /***************************************************************************
   * CREATE METHODS
   **************************************************************************/

  /**
   * @param {Quiz} quiz
   * @returns {string | null} quizId
   */
  static async addOneQuiz (quiz: Quiz) {
    try {
      const result = await quizzes.insertOne(quiz)
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
   * @param {Quiz} quiz
   * @returns {number} modifiedCount
   */
  static async updateOneQuiz (quiz: Quiz) {
    try {
      // omit the "_id" field from the quiz object
      const { _id, ...rest } = quiz

      const result = await quizzes.updateOne(
        {
          _id: new ObjectId(_id)
        },
        {
          $set: {
            ...rest
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
   **************************************************************************/

  /**
   * @param {string} quizId
   * @returns {number} deletedCount
   */
  static async deleteOneQuiz (quizId: string) {
    try {
      const result = await quizzes.deleteOne({
        _id: new ObjectId(quizId)
      })

      return result.deletedCount
    } catch (e) {
      console.error(e)
      return 0
    }
  }
}
