<template>
  <div>
    <v-row>
      <v-col>
        <h1>Organizations</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="dialog = true">
          Add Organization
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="organizationStore.organizations"
      class="mt-4"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-delete" variant="text" @click="removeOrg(item.id)" />
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>New Organization</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addOrg">
            <v-text-field
              v-model="newOrg.name"
              label="Organization Name"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="addOrg">Add</v-btn>
          <v-btn @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useOrganizationStore } from '../stores/organization'

const organizationStore = useOrganizationStore()
const dialog = ref(false)
const newOrg = ref({ name: '' })

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Actions', key: 'actions' }
]

function addOrg() {
  organizationStore.addOrganization({
    id: Date.now(),
    name: newOrg.value.name
  })
  dialog.value = false
  newOrg.value.name = ''
}

function removeOrg(id) {
  organizationStore.removeOrganization(id)
}
</script>
