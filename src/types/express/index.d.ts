import { type User as LocalUser } from '../user'

declare global {
  namespace Express {
    interface User extends LocalUser {}
  }
}
