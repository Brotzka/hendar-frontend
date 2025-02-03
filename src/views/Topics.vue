<template>
  <div>
    <template v-if="appStore.currentApp">
      <v-row>
        <v-col>
          <h1>Topics for {{ appStore.currentApp.name }}</h1>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" @click="dialog = true">
            Add Topic
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="topicStore.currentAppTopics"
        class="mt-4"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn icon="mdi-delete" variant="text" @click="removeTopic(item.id)" />
        </template>
      </v-data-table>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>New Topic</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="addTopic">
              <v-text-field
                v-model="newTopic.name"
                label="Topic Name"
                required
              />
              <v-textarea
                v-model="newTopic.description"
                label="Description"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="addTopic">Add</v-btn>
            <v-btn @click="dialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <v-alert
      v-else
      type="warning"
      text="Please select an app to view topics"
      class="mt-4"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTopicStore } from '../stores/topic'
import { useAppStore } from '../stores/app'

const route = useRoute()
const topicStore = useTopicStore()
const appStore = useAppStore()
const dialog = ref(false)
const newTopic = ref({
  name: '',
  description: ''
})

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Actions', key: 'actions' }
]

onMounted(() => {
  if (route.params.appId) {
    appStore.setCurrentApp(Number(route.params.appId))
  }
})

function addTopic() {
  if (newTopic.value.name) {
    topicStore.addTopic(
      newTopic.value.name,
      newTopic.value.description
    )
    dialog.value = false
    newTopic.value = { name: '', description: '' }
  }
}

function removeTopic(id) {
  topicStore.removeTopic(id)
}
</script>
