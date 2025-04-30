<template>
  <v-card
    prepend-icon="mdi-calendar-clock"
    :title="newTimeFrame ? 'Add New Timeframe' : 'Edit Timeframe'"
  >
    <v-card-text class="pb-0">
      <v-form class="d-flex flex-wrap"
        v-model="isFormValid"
        ref="timeFrameForm" >
        <v-text-field
          density="compact"
          variant="outlined"
          :rules="[rules.required]"
          label="Description"
          class="flex-1-1-100"
          v-model="description"
        ></v-text-field>
        <v-text-field
          density="compact"
          type="number"
          variant="outlined"
          label="Account starting balance"
          class="flex-1-1-100"
          v-model="startingBalance"
        ></v-text-field>
        <v-text-field
          density="compact"
          type="number"
          variant="outlined"
          label="Savings starting balance"
          class="flex-1-1-100"
          v-model="savingsStartingBalance"
        ></v-text-field>
        <div class="flex-1-0 mr-1">
          <v-date-picker
            color="primary"
            width="100%"
            v-model="startDate"
            @update:modelValue="checkEndDate"
          ></v-date-picker>
        </div>
        <div class="flex-1-0 ml-1">
          <v-date-picker
            color="primary"
            width="100%"
            :min="startDate"
            v-model="endDate"
          ></v-date-picker>
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions class="mb-3 mx-1">
      <v-btn
        class="mr2"
        text="Cancel"
        variant="outlined"
        color="error"
        @click="closeModal()"
      ></v-btn>
      <v-btn
        class="mr-3"
        text="Save"
        variant="flat"
        color="primary"
        @click="addNewTimeframe"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
import { useAppStore } from "@/stores/app";
@Component
class TimeFrameModal extends Vue {
  @Prop({ default: true, required: true, type: Boolean })
  newTimeFrame!: boolean;

  endDate: Date = new Date();
  startDate: Date = new Date();
  description = "";
  startingBalance: string = "0";
  savingsStartingBalance: string = "0";
  isFormValid = null;
  rules = {
    required: (value: string) => !!value || "This field is required",
  };

  get appStore() {
    return useAppStore();
  }

  mounted() {
    if (!this.newTimeFrame && this.appStore.selectedTimeframe) {
      this.description = this.appStore.selectedTimeframe.description;
      this.startDate = new Date(this.appStore.selectedTimeframe.startDate);
      this.endDate = new Date(this.appStore.selectedTimeframe.endDate);
      this.startingBalance =
        this.appStore.selectedTimeframe.startingBalance.toString();
      this.savingsStartingBalance =
        this.appStore.selectedTimeframe.savingsStartingBalance.toString();
    } else {
      this.startDate = new Date();
      this.endDate = new Date();
    }
  }

  checkEndDate() {
    if (this.startDate > this.endDate) {
      this.endDate = this.startDate;
    }
  }

  addNewTimeframe() {
    let refForm = this.$refs.timeFrameForm as HTMLFormElement;
    let valid = refForm.validate();
    if (this.isFormValid) {
      if (this.newTimeFrame) {
        this.appStore.addNewTimeframe(
          this.description,
          this.startDate,
          this.endDate,
          parseFloat(this.startingBalance),
          parseFloat(this.savingsStartingBalance)
        );
      } else {
        this.appStore.editTimeframe(
          this.description,
          this.startDate,
          this.endDate,
          parseFloat(this.startingBalance),
          parseFloat(this.savingsStartingBalance)
        );
      }
      this.closeModal();
    }
  }

  closeModal() {
    this.$emit("closeModal");
  }
}
export default toNative(TimeFrameModal);
</script>
