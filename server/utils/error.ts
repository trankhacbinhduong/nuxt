export const createAppError = (message: string, status: number) => {
  return createError({
    message,
    status,
  })
}
