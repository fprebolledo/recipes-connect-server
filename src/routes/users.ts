import { Router } from 'express'
import { users } from '../services/users'
import { type UserForm } from '../types/user'
import type { ApiRequest, Response } from '../types/request'
import passport from 'passport'
import { AppError } from '../errors/errors'

const router = Router()

router.post('/auth/sign-up', async (req: ApiRequest<UserForm>, res: Response, next) => {
  try {
    const signUpUser = await users.signUp(req.body)
    res.status(201).json(signUpUser)
  } catch (error: any) {
    next(error)
  }
})

router.post('/auth/sign-in', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err: any, user: any) => {
    if (err) next(err)
    if (!user) throw new AppError('User not found', 404)

    // this should return users with their token
    return res.status(200).json({ user })
  })(req, res, next)
})

export default router
