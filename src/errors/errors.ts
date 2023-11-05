import type { Response } from '../types/request'

class AppError extends Error {
  status: number
  constructor (message: string, status: number) {
    super(message)
    this.status = status
  }
}

// pending manage prisma errors
function errorsMiddleware (err: any, res: Response): void {
  if (err instanceof AppError) {
    res.status(err.status).json({ message: err.message })
  }
  res.status(500).json({ message: 'Internal server error' })
}

export { AppError, errorsMiddleware }
