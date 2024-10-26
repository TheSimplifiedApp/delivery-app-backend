import { Request, Response } from 'express'
import User from '../models/user'

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    // 1. check if the user exist
    const { auth0Id } = req.body
    const existingUser = await User.findOne({ auth0Id })
    if (existingUser) {
      res.status(200).send()
      return
    }
    // 2. create the user if it doesn't exist
    const newUser = new User(req.body)
    await newUser.save()
    // 3. return the user object to calling client
    res.status(201).json(newUser.toObject())
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating user' })
  }
}

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { address, city, country } = req.body
    const user = await User.findById(req.userId)
    if (!user) {
      res.status(404).json({ message: 'user not found' })
      return
    }

    user.address = address
    user.city = city
    user.country = country
    await user.save()
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'error updating user' })
  }
}

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findById(req.userId)
    if (!currentUser) {
      res.status(404).json({message: 'user not found'})
      return
    }
    res.json(currentUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'unable to fetch user' })
  }
}

export default { createCurrentUser, updateCurrentUser, getCurrentUser }