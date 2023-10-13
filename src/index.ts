import express, { Application } from 'express'
import userRouter from './routes/users'

const app: Application = express()
const port = 3001

// Body parsing Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)

try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`)
}
