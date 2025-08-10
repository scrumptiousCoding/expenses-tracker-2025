<template>
  <v-card>
    <div class="card-border">
      <v-card-text class="d-flex flex-wrap">
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

</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import { useGraphStore } from "@/stores/graphStore";
import { Component, Vue, toNative } from "vue-facing-decorator";
import TimeFrameModal from "@/components/Modals/TimeFrame.vue";
@Component({
  components: {
    TimeFrameModal
  },
})
class NavigationComp extends Vue {
  showNewTimeframeModal = false;
  get appStore() {
    return useAppStore();
  }

  get graphStore() {
    return useGraphStore();
  }

  get timeFrameOptions() {
    return this.appStore.timeframes;
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
