import express, { type Application } from 'express'
import userRouter from './routes/users'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import localStrategy from './strategies/local'
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express()
const port = 3001
const secret = process.env.SESSION_SECRET ?? 'secret'

passport.use(localStrategy)
app.use(passport.initialize())
app.use(session({
  secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.session())

// Body parsing Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use(userRouter)

// Auth middleware example
app.use((req, res, next) => {
  if (req.user) next()
  else {
    res.status(401).json({ message: 'Unauthorized' })
  }
})
app.get('/', (_, res) => {
  res.send('Hello World!')
})

try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`)
}
