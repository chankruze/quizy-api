/*
Author: chankruze (chankruze@gmail.com)
Created: Wed Apr 06 2022 07:32:05 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { ObjectID } from 'bson'
import { User } from '../types/user'

let users

export default class UsersDAO {
  static async injectDB (conn) {
    if (users) {
      return
    }
    try {
      users = await conn.db(process.env.BOSEDB_NS).collection('users')
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  /**
   * Finds a user in the `users` collection
   * @param {string} email - The email of the desired user
   * @returns {User | null} Returns either a single user or nothing
   */
  static async getOneUser (email: string) {
    // Retrieve the user document corresponding with the user's email.
    try {
      return await users.findOne({ email })
    } catch (e) {
      console.error(`Unable to retrieve user from users collection: ${e}`)
      return null
    }
  }

  /**
   * @param {User} user
   * @returns {number} modifiedCount
   */
  static async updateOneUser (user: User) {
    try {
      const result = await users.updateOne(
        {
          _id: new ObjectID(user._id)
        },
        {
          $set: {
            email: user.email,
            image: user.image,
            name: user.name
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
