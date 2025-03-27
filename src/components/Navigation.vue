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
            @click="openNewTimeframeModal"
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
    <v-card prepend-icon="mdi-calendar-clock" title="Add new timeframe">
      <v-card-text class="pb-0">
        <v-form class="d-flex flex-wrap">
          <v-text-field
            density="compact"
            variant="outlined"
            label="Description"
            class="flex-1-1-100"
            v-model="description"
          ></v-text-field>
          <v-text-field
            density="compact"
            type="number"
            variant="outlined"
            label="Starting balance"
            class="flex-1-1-100"
            v-model="startingBalance"
          ></v-text-field>
          <div class="flex-1-0 mr-1">
            <v-date-picker
              color="primary"
              width="100%"
              v-model="startDate"
            ></v-date-picker>
          </div>
          <div class="flex-1-0 ml-1">
            <v-date-picker
              color="primary"
              width="100%"
              v-model="endDate"
            ></v-date-picker>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="mb-3">
        <v-btn
          class="mr2"
          text="Cancel"
          variant="outlined"
          color="error"
          @click="showNewTimeframeModal = false"
        ></v-btn>
        <v-btn
          class="mr-3"
          text="Ok"
          variant="flat"
          color="primary"
          @click="addNewTimeframe"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import { useGraphStore } from "@/stores/graphStore";
import { Component, Vue, toNative } from "vue-facing-decorator";
@Component
class NavigationComp extends Vue {
  tfOpt = null

  showNewTimeframeModal = false;
  endDate: Date = new Date();
  startDate: Date = new Date();
  description ="";
  startingBalance: string = "0"
  
  get appStore() {
    return useAppStore()
  }
  
  get graphStore() {
    return useGraphStore()
  }
  get timeFrameOptions() {
    return this.appStore.timeframes
  }

  openNewTimeframeModal() {
    this.showNewTimeframeModal = true
    this.startDate = new Date();
    this.endDate = new Date();
    this.description = "";
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
  addNewTimeframe() {
      this.appStore.addNewTimeframe(
        this.description,
        this.startDate,
        this.endDate,
        parseFloat(this.startingBalance)
      );
      this.showNewTimeframeModal = false;
  }
}
export default toNative(NavigationComp);
</script>
<style></style>
