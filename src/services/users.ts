import { prismaClient } from '../prismaClient'
import { type User, type UserForm } from '../types/user'
import { hashPassword } from '../utils/password'

const userService = prismaClient.$extends({
  model: {
    users: {
      async signUp (props: UserForm): Promise<User | null> {
        const password = hashPassword(props.password)
        // search how to serialize objects
        return await prismaClient.users.create({ data: { ...props, password } })
      }
    }
  }
})

const users = userService.users
export { users }
