<template>
  <div>
    <v-row>
      <v-col>
        <h1>Apps</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="dialog = true">
          Add App
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="appStore.currentOrgApps"
      class="mt-4"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-delete" variant="text" @click="removeApp(item.id)" />
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>New App</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addApp">
            <v-text-field
              v-model="newAppName"
              label="App Name"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="addApp">Add</v-btn>
          <v-btn @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()
const dialog = ref(false)
const newAppName = ref('')

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Actions', key: 'actions' }
]

function addApp() {
  if (newAppName.value) {
    appStore.addApp(newAppName.value)
    dialog.value = false
    newAppName.value = ''
  }
}

function removeApp(id) {
  appStore.removeApp(id)
}
</script>
