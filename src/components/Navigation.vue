<template>
  <v-card>
    <div class="card-border">
      <v-card-text class="d-flex flex-wrap">
        <div class="flex-1-0">
          <v-select
            v-model="selectedTimeframe"
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
          <v-btn variant="text" density="comfortable" icon="mdi-cog"> </v-btn>
          <!-- devision of funds -->
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
import { Component, Vue, toNative } from "vue-facing-decorator";
@Component
class NavigationComp extends Vue {
  timeFrameOptions = [];
  selectedTimeframe = null;

  showNewTimeframeModal = false;
  endDate = null;
  startDate = null;
  description = "";

  openNewTimeframeModal() {}
  changeTimeframe() {}
  addNewTimeframe() {}
}
export default toNative(NavigationComp);
</script>
<style></style>
