/* eslint-disable @typescript-eslint/no-explicit-any */
import { drizzle } from 'drizzle-orm/d1'
import { asc, desc } from 'drizzle-orm'
import * as schema from '../database/schema'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type User = typeof schema.users.$inferSelect

export const sortBy = (sortColumns: Record<string, any>, column: string, order: string) => {
  const sortColumn = sortColumns[column]
  return order === 'asc' ? asc(sortColumn) : desc(sortColumn)
}
