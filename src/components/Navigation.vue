<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
  >
    <v-divider />

    <v-list
      density="compact"
      nav
    >
      <v-list-item
        prepend-icon="mdi-bulletin-board"
        title="Notice"
        @click="showNoticeModal = !showNoticeModal"
      />
      <v-list-item
        prepend-icon="mdi-cog"
        title="Settings"
        @click="showSettingsModal = !showSettingsModal"
      />
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Theme"
      />
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Import data"
      />
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Export data"
      />
      <v-list-item
        prepend-icon="mdi-book-open-page-variant-outline"
        title="Release Notes"
        @click="showReleaseNotesModal = !showReleaseNotesModal"
      />
    </v-list>

    <v-divider />

    <v-list-item> Copyright © 2025 </v-list-item>
  </v-navigation-drawer>
  <v-card>
    <div class="card-border">
      <v-card-text class="d-flex flex-wrap">
        <div class="mx-2 align-self-center">
          <v-btn
            block
            variant="flat"
            icon="mdi-menu"
            size="small"
            @click="drawer = !drawer"
          />
        </div>
        <div class="flex-1-0">
          <v-select
            v-model="appStore.selectedTimeframe"
            :items="timeFrameOptions"
            item-title="description"
            item-value="id"
            variant="outlined"
            hide-details="auto"
            density="compact"
            label="Select a timeframe"
            return-object
            single-line
            @update:model-value="changeTimeframe"
          />
        </div>
        <div class="mx-2 align-self-center">
          <v-btn
            block
            variant="flat"
            color="secondary"
            @click="showNewTimeframeModal = true"
          >
            New timeframe
          </v-btn>
        </div>
        <div class="align-self-center">
          <v-menu location="bottom">
            <template #activator="{ props }">
              <v-btn
                variant="text"
                density="comfortable"
                icon="mdi-cog"
                v-bind="props"
              />
            </template>

            <v-list>
              <v-list-item @click="deselectTimeframe()">
                <v-list-item-title>De-select time frame</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-text>
    </div>
  </v-card>

  <v-dialog
    v-model="showNewTimeframeModal"
    width="800"
  >
    <time-frame-modal
      :new-time-frame="true"
      @close-modal="showNewTimeframeModal = false"
    />
  </v-dialog>

  <v-dialog
    v-model="showNoticeModal"
    width="500"
    @after-leave="closeNoticeModal()"
  >
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
  </v-dialog>
  <v-dialog
    v-model="showSettingsModal"
    width="800"
  >
    <settings-modal @close-modal="showSettingsModal = false" />
  </v-dialog>
  <v-dialog
    v-model="showReleaseNotesModal"
    width="500"
  >
    <release-notes-modal @close-modal="showSettingsModal = false" />
  </v-dialog>
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import { useGraphStore } from "@/stores/graphStore";
import { Component, Vue, toNative } from "vue-facing-decorator";
import TimeFrameModal from "@/components/Modals/TimeFrame.vue";
import SettingsModal from "@/components/Modals/Settings.vue";
import ReleaseNotesModal from "@/components/Modals/ReleaseNotes.vue";
@Component({
  components: {
    TimeFrameModal,
    SettingsModal,
    ReleaseNotesModal,
  },
})
class NavigationComp extends Vue {
  showNewTimeframeModal = false;
  showSettingsModal = false;
  showReleaseNotesModal = false;
  drawer = false;
  showNoticeModal = false;
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

  get graphStore() {
    return useGraphStore();
  }

  get timeFrameOptions() {
    return this.appStore.timeframes;
  }

  mounted() {
    this.showNoticeModal = this.appStore.firstLoad;
  }

  closeNoticeModal() {
    this.showNoticeModal = false;
    this.appStore.firstLoad = false;
  }

  changeTimeframe() {
    if (this.appStore.selectedTimeframe !== null) {
      this.graphStore.constructData();
    }
  }
  deselectTimeframe() {
    this.appStore.clearTimeframe();
  }
}
export default toNative(NavigationComp);
</script>
<style></style>
