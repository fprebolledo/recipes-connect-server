import { genSaltSync, hashSync } from 'bcrypt'

function hashPassword (password: string): string {
  return hashSync(password, genSaltSync(10))
}

export { hashPassword }
