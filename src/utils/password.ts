import { genSaltSync, hashSync, compareSync } from 'bcrypt'

function hashPassword (password: string): string {
  return hashSync(password, genSaltSync(10))
}

function comparePasswords (password: string, userDbPassword: string): boolean {
  return compareSync(password, userDbPassword)
}

export { hashPassword, comparePasswords }
