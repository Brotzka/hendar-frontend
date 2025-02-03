import { defineStore } from 'pinia'
import { useAppStore } from './app'
import { useOrganizationStore } from './organization'

export const useTopicStore = defineStore('topic', {
  state: () => ({
    topics: []
  }),
  getters: {
    currentAppTopics: (state) => {
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
      
      // Return topics for current app
      return state.topics.filter(topic => topic.appId === currentApp.id)
    },
    getTopicsByApp: (state) => (appId) => {
      const appStore = useAppStore()
      const organizationStore = useOrganizationStore()
      
      // Get the app
      const app = appStore.apps.find(a => a.id === appId)
      
      // If app doesn't exist or doesn't belong to current organization, return empty array
      if (!app || app.orgId !== organizationStore.currentOrganizationId) return []
      
      return state.topics.filter(topic => topic.appId === appId)
    }
  },
  actions: {
    addTopic(name, description) {
      const appStore = useAppStore()
      const organizationStore = useOrganizationStore()
      
      // Verify current app belongs to current organization
      if (!appStore.currentApp || 
          !appStore.currentOrgApps.find(app => app.id === appStore.currentApp.id)) {
        return
      }
      
      this.topics.push({
        id: Date.now(),
        appId: appStore.currentAppId,
        name,
        description
      })
    },
    removeTopic(id) {
      const appStore = useAppStore()
      const organizationStore = useOrganizationStore()
      
      // Get the topic
      const topic = this.topics.find(t => t.id === id)
      
      // If topic doesn't exist, return
      if (!topic) return
      
      // Get the app that owns this topic
      const app = appStore.apps.find(a => a.id === topic.appId)
      
      // Only remove if topic belongs to current organization
      if (app && app.orgId === organizationStore.currentOrganizationId) {
        this.topics = this.topics.filter(t => t.id !== id)
      }
    }
  }
})
