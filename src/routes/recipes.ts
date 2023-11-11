import { Router } from 'express'
import type { Request, Response } from '../types/request'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()
const router = Router()

router.get('/recipes', async (_req: Request, res: Response, next) => {
  try {
    const recipes = await prismaClient.recipes.findMany({
      include: {
        ingredients: true
      }
    })
    res.status(200).json(recipes)
  } catch (error) {
    next(error)
  }
})

export default router
