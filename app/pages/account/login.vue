<template>
  <UCard class="account-login">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      :providers="providers"
      title="Welcome back"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
      @submit="onSubmit"
    >
      <template #description>
        Don't have an account? <NuxtLink
          to="/account/signup"
          class="text-link"
        >Sign up</NuxtLink>.
      </template>

      <template #password-hint>
        <NuxtLink
          to="/"
          class="text-link"
        >Forgot password?</NuxtLink>
      </template>

      <template #footer>
        By signing in, you agree to our <NuxtLink
          to="/"
          class="text-link"
        >Terms of Service</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: 'Login',
})

const fields = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
}]

const validate = (state: Pick<User, 'email' | 'password'>) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

const providers = [{
  label: 'Continue with GitHub',
  icon: 'i-simple-icons-github',
  color: 'white' as const,
  click: () => {
    console.log('Redirect to GitHub')
  },
}]

const toast = useToast()
const route = useRoute()
async function onSubmit(data: Pick<User, 'email' | 'password'>) {
  try {
    const response = await $fetch('/api/v1/auth/login', {
      method: 'POST',
      body: data,
    })

    toast.add({ title: response.message })
    await useUserSession().fetch()
    return navigateTo(route.query.redirect as string || '/dashboard')
  }
  catch (error) {
    console.error(error)
    toast.add({ title: error.response._data.message, color: 'red' })
  }
}
</script>

<style scoped>
.account-login {
 @apply max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur;
}

.text-link {
  @apply text-primary font-medium;
}
</style>
