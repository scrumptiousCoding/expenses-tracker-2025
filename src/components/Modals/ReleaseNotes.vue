<template>
  <v-card>
    <v-card-title class="pb-0">
      <div class="ribbon-corner" />
      <div class="ribbon-corner-secondary" />
      <h1>Release Notes</h1>
    </v-card-title>
    <v-card-text class="px-2 pt-0">
      <v-card
        class="sticky-note"
      >
        <v-card-title class="sticky-note-title">
          Release {{ release.version }}
        </v-card-title>
        <v-card-text class="pb-0">
          <v-timeline side="end">
            <v-timeline-item
              v-for="(task, j) in release.notes"
              :key="j"
              size="x-small"
              color="secondary"
              fill-dot
            >
              {{ task }}
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import releaseNotes from "@/releaseNotes.json";
@Component
class ReleaseNotesModal extends Vue {
  release = releaseNotes[0]
  
  closeModal() {
    this.$emit("closeModal");
  }
}
export default toNative(ReleaseNotesModal);
</script>
