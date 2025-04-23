<template>
  <v-card prepend-icon="mdi-calendar-clock" title="Delete transaction">
    <v-card-text class="pb-0">
      <p>
        Are you sure you want to delete
        <span class="font-weight-bold">{{ transaction.description }}</span>
        with a total of
        <span class="font-weight-bold">
          {{ settingsStore.currencyFormatting(transaction.amount) }} </span
        >?
      </p>
    </v-card-text>
    <v-card-actions class="mb-3 mx-1">
      <v-btn
        class="mr-2"
        text="Cancel"
        variant="outlined"
        color="error"
        @click="closeModal"
      ></v-btn>
      <v-btn
        class="mr-3"
        text="Ok"
        variant="flat"
        color="primary"
        @click="deleteTransaction"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { useSettingsStore } from "@/stores/settingsStore";
import type { ITransaction } from "@/stores/interfaces/ITimeframe";
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
@Component
class TransactionModal extends Vue {
  @Prop({ required: true }) transaction!: ITransaction;
  get settingsStore() {
    return useSettingsStore();
  }
  closeModal() {
    this.$emit("closeModal");
  }
  deleteTransaction() {
    this.$emit("deleteTransaction");
  }
}
export default toNative(TransactionModal);
</script>
