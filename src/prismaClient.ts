import { PrismaClient as DbClient, type PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var _client: PrismaClient
}

if (global._client === null || global._client === undefined) {
  global._client = new DbClient()
}

const prismaClient = global._client

export { prismaClient }
