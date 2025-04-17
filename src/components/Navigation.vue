<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-bulletin-board"
        title="Notice"
        @click="showNoticeModal = !showNoticeModal"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-cog"
        title="Settings"
        @click="showSettingsModal = !showSettingsModal"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Theme"
        value="home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Import data"
        value="home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Export data"
        value="home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Release Notes"
        value="home"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list-item> Copyright © 2025 </v-list-item>
  </v-navigation-drawer>
  <v-card>
    <div class="card-border">
      <v-card-text class="d-flex flex-wrap">
        <div class="mx-2 align-self-center">
          <v-btn
            block
            @click="drawer = !drawer"
            variant="flat"
            icon="mdi-menu"
            size="small"
          >
          </v-btn>
        </div>
        <div class="flex-1-0">
          <v-select
            v-model="tfOpt"
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
          ></v-select>
        </div>
        <div class="mx-2 align-self-center">
          <v-btn
            block
            @click="showNewTimeframeModal = true"
            variant="flat"
            color="secondary"
          >
            New timeframe
          </v-btn>
        </div>
        <div class="align-self-center">
          <v-menu location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                variant="text"
                density="comfortable"
                icon="mdi-cog"
                v-bind="props"
              ></v-btn>
            </template>

            <v-list>
              <v-list-item @click="deselectTimeframe()">
                <v-list-item-title>De-select time frame</v-list-item-title>
              </v-list-item>
              <v-list-item @click="addDummyData()">
                <v-list-item-title>Add dummy time frames</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-text>
    </div>
  </v-card>

  <v-dialog v-model="showNewTimeframeModal" width="800">
    <time-frame-modal
      :newTimeFrame="true"
      @closeModal="showNewTimeframeModal = false"
    />
  </v-dialog>

  <v-dialog
    v-model="showNoticeModal"
    width="500"
    @after-leave="closeNoticeModal()"
  >
    <v-card>
      <v-card-title>
        <div class="ribbon-corner"></div>
        <div class="ribbon-corner-secondary"></div>
        <h1>{{!appStore.firstLoad ? 'Hi there!' : 'Welcome'}}</h1>
      </v-card-title>
      <v-card
        class="sticky-note">
        <v-card-title
          class="sticky-note-title">
          Notes
        </v-card-title>
        <v-card-text class="pt-2">
          <v-timeline side="end">
            <v-timeline-item
              size="x-small"
              v-for="(note, index) in notes"
              :key="index"
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
  <v-dialog v-model="showSettingsModal" width="800" >
    <settings-modal 
    @closeModal="showSettingsModal = false"/>
  </v-dialog>
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import { useGraphStore } from "@/stores/graphStore";
import { Component, Vue, toNative } from "vue-facing-decorator";
import TimeFrameModal from "@/components/TimeFrameModal.vue";
import SettingsModal from "@/components/SettingsModal.vue";
@Component({
  components: {
    TimeFrameModal,
    SettingsModal
  },
})
class NavigationComp extends Vue {
  tfOpt = null;
  showNewTimeframeModal = false;
  showSettingsModal = false;
  drawer = false;
  showNoticeModal = false;
  notes = [
    {
      title: "No accounts needed.",
      description: "Everything is stored on the device you are working on",
    },
    {
      title: "Not your currency?",
      description:
        "No problem! Just change the currency in the settings menu.",
    },
    {
      title: "We love feedback.",
      description:
        "Feel free to reach out and tell us what you like or would like to see!",
    },
    {
      title: "(Coming soon) Keep your data save.",
      description: "Export your data and import it to other devices",
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
    if (this.tfOpt !== null) {
      this.appStore.setSelectedTimeframe(this.tfOpt);
      this.graphStore.constructData();
    }
  }
  deselectTimeframe() {
    this.appStore.clearTimeframe();
    this.tfOpt = null;
  }
  addDummyData() {
    this.appStore.addDummyTimeframe();
  }
}
export default toNative(NavigationComp);
</script>
<style></style>
