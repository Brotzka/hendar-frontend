import { defineStore } from 'pinia'

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organizations: [],
    currentOrganizationId: null
  }),
  getters: {
    currentOrganization: (state) => {
      return state.organizations.find(org => org.id === state.currentOrganizationId)
    }
  },
  actions: {
    addOrganization(org) {
      this.organizations.push(org)
      if (!this.currentOrganizationId) {
        this.currentOrganizationId = org.id
      }
    },
    removeOrganization(id) {
      this.organizations = this.organizations.filter(org => org.id !== id)
      if (this.currentOrganizationId === id) {
        this.currentOrganizationId = this.organizations[0]?.id || null
      }
    },
    setCurrentOrganization(id) {
      this.currentOrganizationId = id
    }
  }
})
