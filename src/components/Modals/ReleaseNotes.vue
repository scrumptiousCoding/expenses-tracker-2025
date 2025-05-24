<template>
  <v-card>
    <v-card-title>
      <div class="ribbon-corner" />
      <div class="ribbon-corner-secondary" />
      <h1>Release Notes</h1>
    </v-card-title>
    <v-card-text class="px-1">
      <v-card
        v-for="(note, index) in notes"
        :key="index"
        class="sticky-note"
      >
        <v-card-title class="sticky-note-title">
          Release {{ note.release }}
        </v-card-title>
        <v-card-text class="pb-0">
          <v-timeline side="end">
            <v-timeline-item
              v-for="(task, j) in note.tasks"
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
@Component
class ReleaseNotesModal extends Vue {
  notes = [
    // {
    //   release: "0.2.0",
    //   tasks: [
    //     "Note: Internal Data Structure Changed - Please empty out local storage, no backwards compatibility is currently available.",
    //     "Added release notes to display new features and changes.",
    //     "Fixed grammar issues on the welcome page",
    //     "Can now remove funds from the savings account",
    //     "Can now add savings account starting balance to the time frame",
    //     "Removed 'Add dummy time frame' option",
    //     "Localization on currency now allows for selection of currency",
    //     "Description field is now required on transactions and time frames",
    //     "End Date of a timeframe can no longer be set to a date before the start date",
    //     "Automatically set the newest created time frame to the current time frame"
    //   ]
    // },
    
    {
      release: "0.3.0",
      tasks: [
        "Test document fixes as per indication (3, 4, 5, 7)",
        "(1) Added conditional check for timeframes and if none are available it will read create",
        "(6) The anger happened cause the amounts was added together as strings, not as amounts. Fixed",
        "Transaction amount only allows number and periods as enterable values, this applies to starting numbers too",
        "General ux update for smaller screens"
      ]
    }
  ];
  closeModal() {
    this.$emit("closeModal");
  }
}
export default toNative(ReleaseNotesModal);
</script>
