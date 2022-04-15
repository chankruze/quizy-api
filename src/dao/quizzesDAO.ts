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

  /**
   * @param {null}
   * @returns {Array<Quiz>}
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
   * @returns {Array<Quiz>}
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
   * @returns {Array<Quiz>}
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
   * @param {string} title
   * @returns {Array<Quiz>}
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
   * @returns {Quiz}
   */
  static async getOneQuizByID (quizId: string) {
    try {
      return await quizzes.findOne({
        _id: new ObjectId(quizId)
      })
    } catch (e) {
      console.error(e)
      return []
    }
  }

  /**
   * @param {Quiz} quiz
   * @returns {string}
   */
  static async addOneQuiz (quiz: Quiz) {
    try {
      const result = await quizzes.insertOne(quiz)
      return result.insertedId
    } catch (e) {
      console.error(e)
      return ''
    }
  }

  static async updateOneQuiz (quiz: Quiz) {
    try {
      const result = await quizzes.updateOne(
        {
          _id: new ObjectId(quiz._id)
        },
        {
          $set: {
            title: quiz.title,
            description: quiz.description,
            branch: quiz.branch,
            semester: quiz.semester,
            questions: quiz.questions,
            date: quiz.date
          }
        }
      )
      return result.modifiedCount
    } catch (e) {
      console.error(e)
      return 0
    }
  }
}
