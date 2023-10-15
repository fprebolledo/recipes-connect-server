import { Router } from 'express'
import { users } from '../services/users'
import { type UserForm } from '../types/user'
import type { ApiRequest, Response } from '../types/request'

const router = Router()

router.post('/users', async (req: ApiRequest<UserForm>, res: Response) => {
  try {
    const signUpUser = await users.signUp(req.body)
    res.status(201).json(signUpUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

export default router
