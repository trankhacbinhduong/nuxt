import { like, or } from 'drizzle-orm'

type Query = { search?: string, sort?: string, order?: string }

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const query = getQuery<Query>(event)
  const { search, sort = 'id', order = 'desc' } = query

  const queryBuilder = useDrizzle().select({
    id: tables.users.id,
    name: tables.users.name,
    email: tables.users.email,
    avatar: tables.users.avatar,
    createdAt: tables.users.createdAt,
    updatedAt: tables.users.updatedAt,
  }).from(tables.users)

  if (search) {
    queryBuilder.where(
      or(
        like(tables.users.name, `%${search}%`),
        like(tables.users.email, `%${search}%`),
      ))
  }

  const { id, name, email } = tables.users
  const sortColumns = { id, name, email }
  queryBuilder.orderBy(
    sortBy(sortColumns, sort, order),
  )

  const users = await queryBuilder

  return users
})
