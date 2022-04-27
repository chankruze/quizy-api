/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 17 2022 16:36:55 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as express from 'express'
import UsersDAO from '../dao/usersDAO'

const router = express.Router()

/**
 * Route serving a user by email
 * @name get/:email
 */
router.get('/:email', async (req, res) => {
  const user = await UsersDAO.getOneUser(req.params.email)

  if (user) return res.json({ ...user })

  return res.status(404).json({ user: null, message: 'User not found' })
})

/**
 * Route updating  a user by email
 * @name put/:email
 */
router.put('/:email', async (req, res) => {
  // find the user by email
  const user = await UsersDAO.getOneUser(req.params.email)

  if (user) {
    const modifiedCount = await UsersDAO.updateOneUser({
      _id: user._id,
      ...req.body
    })

    if (modifiedCount === 1) {
      return res.json({ message: 'User updated' })
    }

    return res.json({ message: 'User already updated' })
  }

  return res.status(404).json({ message: 'User not found' })
})

export default router
