<template>
  <v-app>
    <v-app-bar>
      <v-select
        v-if="organizationStore.organizations.length"
        v-model="organizationStore.currentOrganizationId"
        :items="organizationStore.organizations"
        item-title="name"
        item-value="id"
        label="Organization"
        hide-details
        density="compact"
        class="organization-selector"
        @update:model-value="organizationStore.setCurrentOrganization"
      />
      <v-btn
        v-else
        color="primary"
        @click="showCreateOrgDialog = true"
      >
        Create Organization
      </v-btn>
      <template v-if="organizationStore.currentOrganization">
        <v-select
          v-if="appStore.currentOrgApps.length"
          v-model="appStore.currentAppId"
          :items="appStore.currentOrgApps"
          item-title="name"
          item-value="id"
          label="App"
          hide-details
          density="compact"
          class="app-selector"
          @update:model-value="handleAppChange"
        />
        <v-btn
          v-else
          color="primary"
          @click="showCreateAppDialog = true"
          class="ml-4"
        >
          Create App
        </v-btn>
      </template>
      <v-spacer />
      <v-btn
        v-if="organizationStore.organizations.length"
        icon="mdi-plus"
        @click="showCreateOrgDialog = true"
      />
    </v-app-bar>

    <template v-if="organizationStore.currentOrganization">
      <v-navigation-drawer permanent>
        <v-list>
          <v-list-item :to="{ name: 'dashboard' }" prepend-icon="mdi-view-dashboard" title="Dashboard" />
          <v-list-item :to="{ name: 'apps' }" prepend-icon="mdi-apps" title="Apps" />
          <template v-if="appStore.currentApp">
            <v-list-item 
              :to="{ name: 'app-topics', params: { appId: appStore.currentApp.id }}" 
              prepend-icon="mdi-message-text" 
              title="Topics" 
            />
            <v-list-item 
              :to="{ name: 'app-subscribers', params: { appId: appStore.currentApp.id }}" 
              prepend-icon="mdi-account-group" 
              title="Subscribers" 
            />
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </template>

    <v-main v-else>
      <v-container fluid>
        <v-alert
          type="info"
          text="Please select or create an organization to get started"
          class="mt-4"
        />
      </v-container>
    </v-main>

    <v-dialog v-model="showCreateOrgDialog" max-width="500px">
      <v-card>
        <v-card-title>New Organization</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="createOrganization">
            <v-text-field
              v-model="newOrgName"
              label="Organization Name"
              required
              autofocus
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="createOrganization">Create</v-btn>
          <v-btn @click="showCreateOrgDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showCreateAppDialog" max-width="500px">
      <v-card>
        <v-card-title>New App</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="createApp">
            <v-text-field
              v-model="newAppName"
              label="App Name"
              required
              autofocus
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="createApp">Add</v-btn>
          <v-btn @click="showCreateAppDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrganizationStore } from './stores/organization'
import { useAppStore } from './stores/app'

const router = useRouter()
const organizationStore = useOrganizationStore()
const appStore = useAppStore()
const showCreateOrgDialog = ref(false)
const showCreateAppDialog = ref(false)
const newOrgName = ref('')
const newAppName = ref('')

function handleAppChange(appId) {
  appStore.setCurrentApp(appId)
  const currentRoute = router.currentRoute.value
  if (currentRoute.path.includes('/topics') || currentRoute.path.includes('/subscribers')) {
    router.push({
      name: currentRoute.name,
      params: { appId }
    })
  }
}

function createOrganization() {
  if (newOrgName.value) {
    organizationStore.addOrganization({
      id: Date.now(),
      name: newOrgName.value
    })
    newOrgName.value = ''
    showCreateOrgDialog.value = false
  }
}

function createApp() {
  if (newAppName.value) {
    appStore.addApp(newAppName.value)
    newAppName.value = ''
    showCreateAppDialog.value = false
  }
}
</script>

<style scoped>
.organization-selector, .app-selector {
  max-width: 250px;
  margin: 0 1rem;
}
</style>
