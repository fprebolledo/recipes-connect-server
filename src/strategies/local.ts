import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { users } from '../services/users'
import { comparePasswords } from '../utils/password'
import { AppError } from '../errors/errors'

passport.serializeUser((user, done) => {
  done(undefined, user.id)
})

passport.deserializeUser(async (id: number, done) => {
  try {
    const dbUser = await users.findUnique({ where: { id } })
    if (!dbUser) throw new AppError('User not found', 401)
    done(undefined, dbUser)
  } catch (error) {
    done(error, undefined)
  }
})

const localStrategy = new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  if (!email || !password) throw new AppError('Email and password required', 401)
  try {
    const user = await users.findUnique({ where: { email } })
    if (!user) throw new AppError('Incorrect credentials', 401)

    const validPassword = comparePasswords(password, user.password)
    if (!validPassword) throw new AppError('Incorrect credentials', 401)

    done(undefined, user)
  } catch (error) {
    done(error, undefined)
  }
})

export default localStrategy
