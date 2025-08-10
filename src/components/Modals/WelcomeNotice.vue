<template>
    <v-card>
      <v-card-title>
        <div class="ribbon-corner" />
        <div class="ribbon-corner-secondary" />
        <h1>{{ !appStore.firstLoad ? "Hi There!" : "Welcome" }}</h1>
      </v-card-title>
      <v-card class="sticky-note">
        <v-card-title class="sticky-note-title">
          Notes
        </v-card-title>
        <v-card-text class="pt-2">
          <v-timeline side="end">
            <v-timeline-item
              v-for="(note, index) in notes"
              :key="index"
              size="x-small"
              color="secondary"
              fill-dot
            >
              <span class="font-weight-bold">{{ note.title }}</span>
              {{ note.description }}
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-card>
</template>

<script lang="ts">
import { useAppStore } from "@/stores/app";
import { Component, Vue, toNative } from "vue-facing-decorator";
@Component
class WelcomeNoticeModal extends Vue {
    
  notes = [
    {
      title: "No account needed.",
      description: "Everything is stored on the device you are working on.",
    },
    {
      title: "Not your currency?",
      description: "No problem! Just change the currency in the settings menu.",
    },
    {
      title: "We love feedback.",
      description:
        "Feel free to reach out and tell us what you like or would like to see!",
    },
    {
      title: "(Coming soon) Keep your data safe.",
      description: "Export your data and import it to other devices.",
    },
  ];

  get appStore() {
    return useAppStore();
  }
}
export default toNative(WelcomeNoticeModal);
</script>
