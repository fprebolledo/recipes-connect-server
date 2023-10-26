import type { Request, Response } from 'express'

interface ApiRequest<T> extends Request {
  body: T
}

export type { ApiRequest, Response }
