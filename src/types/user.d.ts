import type { Recipe } from './recipe'
interface User {
  id: number
  createdAt: Date
  createdAt: Date
  email: string
  username: string
  password: string
  recipes?: Recipe[]
}

type UserForm = Pick<User, 'username' | 'email' | 'password'>

export type { User, UserForm }
