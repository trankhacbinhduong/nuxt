export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo({
      path: '/account/login',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})
