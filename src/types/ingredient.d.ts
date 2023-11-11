interface Ingredient {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  amount: number
  recipeId: number
}

export type { Ingredient }
