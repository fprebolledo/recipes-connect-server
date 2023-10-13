import { Router } from 'express'
import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../utils/password'
import { type User } from '../types/user'

const router = Router()
const prisma = new PrismaClient()

interface ExtendedRequest extends Request {
  body: Omit<User, 'id'>
}

// Hacer try catch
router.post('/', async (req: ExtendedRequest, res: Response) => {
  // extract this to a custom model: https://www.prisma.io/docs/concepts/components/prisma-client/custom-models
  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [{ email: req.body.email }, { username: req.body.username }]
    }
  })
  if (existingUser !== null) return res.status(401).send({ message: 'Unauthorized' })

  const password = hashPassword(req.body.password)
  const user = await prisma.users.create({ data: { ...req.body, password } })
  return res.status(201).send({ user })
})

export default router
