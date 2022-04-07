/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 07 2022 13:02:40 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { ObjectId } from 'bson'

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
  static async getQuizzesBySemester (semester: number) {
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
  static async getQuizzesByBranch (branch: string) {
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
  static async getQuizzesByTitle (title: string) {
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
  static async getQuizByID (quizId: string) {
    try {
      return await quizzes.find({
        _id: new ObjectId(quizId)
      })
    } catch (e) {
      console.error(e)
      return []
    }
  }
}
