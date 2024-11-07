<script setup lang="ts">
const links = [{
  id: 'dashboard',
  label: 'Dashboard',
  icon: 'i-heroicons-home',
  to: '/dashboard',
  tooltip: {
    text: 'Dashboard',
    shortcuts: ['G', 'D'],
  },
}, {
  id: 'users',
  label: 'Users',
  icon: 'i-heroicons-user-group',
  to: '/dashboard/users',
  tooltip: {
    text: 'Users',
    shortcuts: ['G', 'U'],
  },
}]

const groups = [{
  key: 'links',
  label: 'Go to',
  commands: links.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts })),
}]
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="300"
      :resizable="{ min: 300, max: 350 }"
      collapsible
    >
      <UDashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <AppLogo />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <div class="flex-1" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <UserDropdownSetting />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
