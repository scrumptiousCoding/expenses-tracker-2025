<template>
  <v-card>
    <v-card-title>
      <div class="ribbon-corner"></div>
      <div class="ribbon-corner-secondary"></div>
      <h1>Release Notes</h1>
    </v-card-title>
    <v-card-text class="px-1">
      <v-card class="sticky-note" v-for="(note, index) in notes" :key="index">
        <v-card-title class="sticky-note-title">
          Release {{ note.release }}
        </v-card-title>
        <v-card-text class="pb-0">
          <v-timeline side="end">
            <v-timeline-item
              size="x-small"
              color="secondary"
              fill-dot
              v-for="(task, index) in note.tasks"
              :key="index"
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
@Component
class ReleaseNotesModal extends Vue {
  notes = [
    {
      release: "0.2.0",
      tasks: [
        "Note: Internal Data Structure Changed - Please empty out local storage, no backwards compatibility is currently available.",
        "Added release notes to display new features and changes.",
        "Fixed grammar issues on the welcome page",
        "Can now remove funds from the savings account",
        "Can now add savings account starting balance to the time frame",
        "Removed 'Add dummy time frame' option",
      ],
    },
  ];
  closeModal() {
    this.$emit("closeModal");
  }
}
export default toNative(ReleaseNotesModal);
</script>
