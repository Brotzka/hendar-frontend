<template>
  <div>
    <template v-if="appStore.currentApp">
      <v-row>
        <v-col>
          <h1>Subscribers for {{ appStore.currentApp.name }}</h1>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" @click="dialog = true">
            Add Subscriber
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="subscriberStore.currentAppSubscribers"
        class="mt-4"
      >
        <template v-slot:item.topicIds="{ item }">
          <v-chip
            v-for="topicId in item.topicIds"
            :key="topicId"
            class="mr-1"
          >
            {{ topicStore.topics.find(t => t.id === topicId)?.name }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon="mdi-delete" variant="text" @click="removeSubscriber(item.id)" />
        </template>
      </v-data-table>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>New Subscriber</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="addSubscriber">
              <v-text-field
                v-model="newSubscriber.name"
                label="Name"
                required
              />
              <v-text-field
                v-model="newSubscriber.webhookUrl"
                label="Webhook URL"
                required
              />
              <v-select
                v-model="newSubscriber.topicIds"
                :items="topicStore.currentAppTopics"
                item-title="name"
                item-value="id"
                label="Topics"
                multiple
                chips
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="addSubscriber">Add</v-btn>
            <v-btn @click="dialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <v-alert
      v-else
      type="warning"
      text="Please select an app to view subscribers"
      class="mt-4"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSubscriberStore } from '../../../stores/subscriber'
import { useTopicStore } from '../../../stores/topic'
import { useAppStore } from '../../../stores/app'

const route = useRoute()
const subscriberStore = useSubscriberStore()
const topicStore = useTopicStore()
const appStore = useAppStore()
const dialog = ref(false)
const newSubscriber = ref({
  name: '',
  webhookUrl: '',
  topicIds: []
})

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Webhook URL', key: 'webhookUrl' },
  { title: 'Topics', key: 'topicIds' },
  { title: 'Actions', key: 'actions' }
]

onMounted(() => {
  if (route.params.appId) {
    appStore.setCurrentApp(Number(route.params.appId))
  }
})

function addSubscriber() {
  if (newSubscriber.value.name && newSubscriber.value.webhookUrl) {
    subscriberStore.addSubscriber(
      newSubscriber.value.name,
      newSubscriber.value.webhookUrl,
      newSubscriber.value.topicIds
    )
    dialog.value = false
    newSubscriber.value = { name: '', webhookUrl: '', topicIds: [] }
  }
}

function removeSubscriber(id) {
  subscriberStore.removeSubscriber(id)
}
</script>
