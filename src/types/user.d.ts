interface User {
  id: number
  email: string
  username: string
  password: string
  createdAt: Date
  createdAt: Date
}

type UserForm = Pick<User, 'username' | 'email' | 'password'>

export type { User, UserForm }
