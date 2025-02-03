import { defineStore } from 'pinia'
import { useOrganizationStore } from './organization'

export const useAppStore = defineStore('app', {
  state: () => ({
    apps: [],
    currentAppId: null
  }),
  getters: {
    currentOrgApps: (state) => {
      const organizationStore = useOrganizationStore()
      return state.apps.filter(app => app.orgId === organizationStore.currentOrganizationId)
    },
    currentApp: (state) => {
      const organizationStore = useOrganizationStore()
      const app = state.apps.find(app => app.id === state.currentAppId)
      
      // Return null if app doesn't exist or doesn't belong to current organization
      if (!app || app.orgId !== organizationStore.currentOrganizationId) {
        return null
      }
      
      return app
    }
  },
  actions: {
    addApp(name) {
      const organizationStore = useOrganizationStore()
      const newApp = {
        id: Date.now(),
        name,
        orgId: organizationStore.currentOrganizationId
      }
      this.apps.push(newApp)
      if (!this.currentAppId) {
        this.currentAppId = newApp.id
      }
    },
    removeApp(id) {
      this.apps = this.apps.filter(app => app.id !== id)
      if (this.currentAppId === id) {
        const firstOrgApp = this.currentOrgApps[0]
        this.currentAppId = firstOrgApp ? firstOrgApp.id : null
      }
    },
    setCurrentApp(id) {
      const app = this.apps.find(app => app.id === id)
      const organizationStore = useOrganizationStore()
      
      // Only set current app if it belongs to current organization
      if (app && app.orgId === organizationStore.currentOrganizationId) {
        this.currentAppId = id
      } else {
        this.currentAppId = null
      }
    }
  }
})
