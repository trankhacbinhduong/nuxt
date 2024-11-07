/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { User as UserRecord } from '~~/server/utils/drizzle'

declare module '#auth-utils' {
  interface User extends Omit<UserRecord, 'password'> {}

  interface UserSession {
    user: Omit<UserRecord, 'password'>
  }
}

export {}
