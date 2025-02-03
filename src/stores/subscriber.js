import { defineStore } from 'pinia'
import { useAppStore } from './app'
import { useOrganizationStore } from './organization'

export const useSubscriberStore = defineStore('subscriber', {
  state: () => ({
    subscribers: []
  }),
  getters: {
    currentAppSubscribers: (state) => {
      const appStore = useAppStore()
      const organizationStore = useOrganizationStore()
      
      // First get all apps for current organization
      const orgApps = appStore.apps.filter(app => 
        app.orgId === organizationStore.currentOrganizationId
      )
      
      // Get current app
      const currentApp = appStore.currentApp
      
      // If no current app, return empty array
      if (!currentApp) return []
      
      // Verify current app belongs to current organization
      if (!orgApps.find(app => app.id === currentApp.id)) return []
      
      // Return subscribers for current app
      return state.subscribers.filter(sub => sub.appId === currentApp.id)
    }
  },
  actions: {
    addSubscriber(name, webhookUrl, topicIds) {
      const appStore = useAppStore()
      const organizationStore = useOrganizationStore()
      
      // Verify current app belongs to current organization
      if (!appStore.currentApp || 
          !appStore.currentOrgApps.find(app => app.id === appStore.currentApp.id)) {
        return
      }
      
      this.subscribers.push({
        id: Date.now(),
        appId: appStore.currentAppId,
        name,
        webhookUrl,
        topicIds
      })
    },
    removeSubscriber(id) {
      const appStore = useAppStore()
      const organizationStore = useOrganizationStore()
      
      // Get the subscriber
      const subscriber = this.subscribers.find(s => s.id === id)
      
      // If subscriber doesn't exist, return
      if (!subscriber) return
      
      // Get the app that owns this subscriber
      const app = appStore.apps.find(a => a.id === subscriber.appId)
      
      // Only remove if subscriber belongs to current organization
      if (app && app.orgId === organizationStore.currentOrganizationId) {
        this.subscribers = this.subscribers.filter(s => s.id !== id)
      }
    }
  }
})
