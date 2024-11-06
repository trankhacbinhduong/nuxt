export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task',
  },
  async run() {
    console.log('Running DB seed task...')
    const users = [
      {
        name: 'Duo',
        email: 'trankhacbinhduong@gmail.com',
        password: await hashPassword('password123'),
        isAdmin: true,
      },
    ]
    await useDrizzle().insert(tables.users).values(users)
    return { result: 'success' }
  },
})
