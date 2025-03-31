<template>
  <v-card>
    <div class="card-border">
      <v-card-text class="d-flex flex-wrap">
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
              <v-btn variant="text" density="comfortable" icon="mdi-cog" v-bind="props"></v-btn>
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
    <time-frame-modal :newTimeFrame="true" @closeModal="showNewTimeframeModal = false"/>
  </v-dialog>
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import { useGraphStore } from "@/stores/graphStore";
import { Component, Vue, toNative } from "vue-facing-decorator";
import TimeFrameModal from "@/components/TimeFrameModal.vue";
@Component({
  components: {
    TimeFrameModal
  }
})
class NavigationComp extends Vue {
  tfOpt = null

  showNewTimeframeModal = false;
  
  get appStore() {
    return useAppStore()
  }
  
  get graphStore() {
    return useGraphStore()
  }
  get timeFrameOptions() {
    return this.appStore.timeframes
  }

  changeTimeframe() {
    if (this.tfOpt !== null) {
      this.appStore.setSelectedTimeframe(this.tfOpt)
      this.graphStore.constructData()
    }
  }
  deselectTimeframe() {
    this.appStore.clearTimeframe()
    this.tfOpt = null
  }
  addDummyData() {
    this.appStore.addDummyTimeframe()
  }
}
export default toNative(NavigationComp);
</script>
<style></style>
