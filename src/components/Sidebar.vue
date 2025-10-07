<template>
  <v-navigation-drawer
    rail
    expand-on-hover
    permanent
  >
    <v-divider />

    <v-list
      density="compact"
      nav
    >
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        @click="goToRoute('/')"
      />
      <v-list-item
        prepend-icon="mdi-chart-areaspline"
        title="Budgets"
        @click="goToRoute('/budgetDashboard')"
      />
      <v-list-item
        prepend-icon="mdi-database-export-outline"
        title="Backup"
        @click="goToRoute('/exportData')"
      />
      <v-list-item
        prepend-icon="mdi-database-import-outline"
        title="Import"
        @click="goToRoute('/importData')"
      />
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
      <!-- <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Theme"
      /> -->
      <v-list-item
        prepend-icon="mdi-book-open-page-variant-outline"
        title="Release Notes"
        @click="showReleaseNotesModal = !showReleaseNotesModal"
      />
    </v-list>
  </v-navigation-drawer>

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
  <welcome-notice />
  </v-dialog>
  <v-dialog
    v-model="showSettingsModal"
    width="800"
  >
    <settings-modal @close-modal="showSettingsModal = false" />
  </v-dialog>
  <v-dialog
    v-model="showReleaseNotesModal"
    width="800"
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
import WelcomeNoticeModal from "./Modals/WelcomeNotice.vue";
@Component({
  components: {
    TimeFrameModal,
    SettingsModal,
    ReleaseNotesModal,
    WelcomeNoticeModal
  },
})
class SidebarComp extends Vue {
  showNewTimeframeModal = false;
  showSettingsModal = false;
  showReleaseNotesModal = false;
  drawer = true;
  showNoticeModal = false;

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
  goToRoute(route: string){ 
    this.$router.push(route)
  }
}
export default toNative(SidebarComp);
</script>
<style></style>
