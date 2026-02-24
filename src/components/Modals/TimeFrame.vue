<template>
  <v-card
    prepend-icon="mdi-calendar-clock"
    :title="newTimeFrame ? 'Add New Timeframe' : 'Edit Timeframe'"
  >
    <v-card-text class="pb-0">
      <v-form
        ref="timeFrameForm"
        v-model="isFormValid"
        class="d-flex flex-wrap"
      >
        <v-text-field
          v-model="description"
          density="compact"
          variant="outlined"
          :rules="[rules.required]"
          label="Description"
          class="flex-1-1-100"
        />
        <v-text-field
          v-model="startingBalance"
          density="compact"
          type="number"
          :rules="[rules.numbersOnly]"
          variant="outlined"
          label="Account starting balance"
          class="flex-1-1-100"
        />
        <v-text-field
          v-model="savingsStartingBalance"
          density="compact"
          type="number"
          variant="outlined"
          :rules="[rules.numbersOnly]"
          label="Savings starting balance"
          class="flex-1-1-100"
        />
        <v-row>
          <v-col cols="6">
            <v-date-picker
              v-model="startDate" width="100%"
              color="primary" show-adjacent-months
              @update:model-value="checkEndDate"
            />
          </v-col>
          <v-col cols="6">
            <v-date-picker
              v-model="endDate" width="100%"
              color="primary" show-adjacent-months
              :min="startDate"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="mb-3 mx-1">
      <v-btn color="error" class="ml-3" @click="showConfirmationModal = !showConfirmationModal" v-if="!newTimeFrame">
        Delete Timeframe
      </v-btn>
      <v-spacer />
      <v-btn
        text="Cancel"
        variant="outlined"
        color="error"
        @click="closeModal()"
      />
      <v-btn
        class="mr-3"
        text="Save"
        variant="flat"
        color="primary"
        @click="addNewTimeframe"
      />
    </v-card-actions>
  </v-card>

  
  <v-dialog
    v-model="showConfirmationModal"
    width="400"
  >
  <delete-timeframe @close-modal="showConfirmationModal = !showConfirmationModal" @delete-timeframe="deleteTimeframe" />
  </v-dialog>

</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
import { useAppStore } from "@/stores/app";
@Component
class TimeFrameModal extends Vue {
  @Prop({ default: true, required: true, type: Boolean }) newTimeFrame!: boolean;

  endDate: Date = new Date();
  startDate: Date = new Date();
  description = "";
  startingBalance: string = "0";
  savingsStartingBalance: string = "0";
  isFormValid = null;
  showConfirmationModal: boolean = false;

  rules = {
    required: (value: string) => !!value || "This field is required",
    numbersOnly: (value: any) => /^[0-9]+([\.][0-9]+)?$/.test(value) || "Only numerical values and a . are allowed"
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
    const refForm = this.$refs.timeFrameForm as HTMLFormElement;
    refForm.validate();
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

  deleteTimeframe() {
    this.showConfirmationModal = false
    this.appStore.deleteTimeframe();
    this.closeModal();
  }
}
export default toNative(TimeFrameModal);
</script>
