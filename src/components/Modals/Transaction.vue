<template>
  <v-card
    prepend-icon="mdi-calendar-clock"
    :title=" transaction.id === null ? 'Add New Transaction' : 'Edit Transaction' "
  >
    <v-card-text class="pb-0">
      <v-form
        ref="form"
        v-model="isFormValid"
        class="d-flex flex-wrap"
        validate-on="lazy"
      >
        <v-text-field
          v-model="transaction.description"
          density="compact"
          variant="outlined"
          :rules="[rules.required]"
          label="Description"
          hide-details="auto"
          class="flex-1-1-100"
        />
        <v-text-field
          v-model="transaction.amount"
          density="compact"
          variant="outlined"
          label="Amount"
          :rules="[rules.required, rules.noNegative]"
          :error-messages="transaction.amount < 0 ? 'Amount must be greater than 0' : null"
          type="number"
          hide-details="auto"
          class="mt-2 flex-1-1-100"
        />

        <v-select
          v-model="transaction.type"
          :items="appStore.transactionTypes"
          class="mt-2 flex-1-1-100"
          variant="outlined"
          hide-details="auto"
          density="compact"
          label="Select a type of transaction"
          single-line
        />
        <v-alert
          v-if="transaction.type === 'Savings'"
          class="mt-2"
          color="info"
          density="compact"
          text="This assumes that savings are in a seperate account and putting something in savings effectively removes it from your account, treating it like an expense. But without the bad colous attached to it"
        />

        <v-date-picker
          v-model="transaction.date"
          class="mt-2"
          color="primary"
          width="100%"
          :min="minDate"
          :max="maxDate"
        />
      </v-form>
    </v-card-text>
    <v-card-actions class="mb-3 mx-1">
      <v-btn
        class="mr-2"
        text="Cancel"
        variant="outlined"
        color="error"
        @click="closeModal()"
      />
      <v-btn
        class="mr-3"
        text="Ok"
        variant="flat"
        color="primary"
        @click="saveTransaction"
      />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { useAppStore } from "@/stores/app";
import type { ITransaction } from "@/stores/interfaces/ITimeframe";
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
@Component
class TransactionModal extends Vue {
  @Prop({ required: true }) transaction!: ITransaction;
  minDate: string = "";
  maxDate: string = "";
  isFormValid = null;
  rules = {
    required: (value: string) => !!value || "This field is required",
    noNegative: (value: number) => value >= 0 || "Amount must be greater than 0",
  };

  get appStore() {
    return useAppStore();
  }
  get selectedTimeframe() {
    return this.appStore.selectedTimeframe;
  }

  mounted() {
    if (this.selectedTimeframe !== null) {
      this.minDate = new Date(this.selectedTimeframe.startDate)
        .toLocaleDateString()
        .split("T")[0];
      this.maxDate = new Date(this.selectedTimeframe.endDate)
        .toLocaleDateString()
        .split("T")[0];
    }
  }

  closeModal() {
    this.$emit("closeModal");
  }
  saveTransaction() {
    const refForm = this.$refs.form as HTMLFormElement;
    if (refForm.validate()) {
      this.$emit("saveTransaction", this.transaction);
    }
  }
}
export default toNative(TransactionModal);
</script>
