import type { Ingredient } from './ingredient'

interface Recipe {
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  authorId: number
  ingredients: Ingredient[]
  instructions: Text
}

export type { Recipe }
