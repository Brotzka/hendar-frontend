<template>
  <div>
    <h1>{{ organizationStore.currentOrganization.name }} Dashboard</h1>
    
    <template v-if="appStore.currentApp">
      <h2 class="mt-4">{{ appStore.currentApp.name }}</h2>
      <v-row>
        <v-col cols="4">
          <v-card>
            <v-card-title>Topics</v-card-title>
            <v-card-text>
              <div class="text-h4">{{ topicStore.currentAppTopics.length }}</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card>
            <v-card-title>Subscribers</v-card-title>
            <v-card-text>
              <div class="text-h4">{{ subscriberStore.currentAppSubscribers.length }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="6">
          <h3>Recent Topics</h3>
          <v-list>
            <v-list-item
              v-for="topic in topicStore.currentAppTopics.slice(0, 5)"
              :key="topic.id"
              :title="topic.name"
              :subtitle="topic.description"
            />
          </v-list>
        </v-col>
        <v-col cols="6">
          <h3>Recent Subscribers</h3>
          <v-list>
            <v-list-item
              v-for="sub in subscriberStore.currentAppSubscribers.slice(0, 5)"
              :key="sub.id"
              :title="sub.name"
              :subtitle="sub.webhookUrl"
            />
          </v-list>
        </v-col>
      </v-row>
    </template>
    
    <template v-else>
      <v-row>
        <v-col cols="4">
          <v-card>
            <v-card-title>Apps</v-card-title>
            <v-card-text>
              <div class="text-h4">{{ appStore.currentOrgApps.length }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12">
          <h3>Apps</h3>
          <v-list>
            <v-list-item
              v-for="app in appStore.currentOrgApps"
              :key="app.id"
              :title="app.name"
            />
          </v-list>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '../stores/organization'
import { useAppStore } from '../stores/app'
import { useTopicStore } from '../stores/topic'
import { useSubscriberStore } from '../stores/subscriber'

const organizationStore = useOrganizationStore()
const appStore = useAppStore()
const topicStore = useTopicStore()
const subscriberStore = useSubscriberStore()
</script>
