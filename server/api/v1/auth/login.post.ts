import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  if (!email || !password) {
    throw createAppError('Email and password are required', 400)
  }

  const user = await useDrizzle().query.users.findFirst({
    where: eq(tables.users.email, email),
  })

  if (!user) {
    throw createAppError('User not found', 404)
  }

  const isPasswordValid = await verifyPassword(user.password, password)
  if (!isPasswordValid) {
    throw createAppError('Invalid password', 400)
  }

  await setUserSession(event, {
    user: omit(user, 'password'),
  })

  return {
    message: 'Logged in successfully',
  }
})
