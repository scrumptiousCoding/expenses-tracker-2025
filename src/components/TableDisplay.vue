<template>
  <v-row>
    <v-col cols="10">
      <v-card>
        <v-data-table
          :loading="loadTableData"
          density="compact"
          :items="selectedTimeframe?.transaction"
          items-per-page="20"
        ></v-data-table>
      </v-card>
    </v-col>
    <v-col cols="2">
      <v-btn class="mb-2" block @click="addNewTransactionModal = !addNewTransactionModal"
        >Add new</v-btn
      >
      <v-btn class="mb-2" block @click="addDummyData">Add Dummy Data</v-btn>
      <v-btn class="mb-2" block>Fixed Expenses</v-btn>
      <v-btn class="mb-2" block>Other Expenses</v-btn>
      <v-btn class="mb-2" block>Income</v-btn>
      <v-btn class="mb-2" block>Savings</v-btn>
      <v-card
        height="185"
        image="@/assets/Strawberries.jpg"
        class="mb-3"
      ></v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="addNewTransactionModal" width="600">
    <v-card prepend-icon="mdi-calendar-clock" title="Add new transaction">
      <v-card-text class="pb-0">
        <v-form class="d-flex flex-wrap">
          <v-text-field
            density="compact"
            variant="outlined"
            label="Description"
            hide-details="auto"
            class="flex-1-1-100"
            v-model="newTransactionDescription"
          ></v-text-field>
          <v-text-field
            density="compact"
            variant="outlined"
            label="Amount"
            type="number"
            hide-details="auto"
            class="mt-2 flex-1-1-100"
            v-model="newTransactionAmount"
          ></v-text-field>

          <v-select
            v-model="newTransactionType"
            :items="appStore.transactionTypes"
            class="mt-2 flex-1-1-100"
            variant="outlined"
            hide-details="auto"
            density="compact"
            label="Select a type of transaction"
            single-line
          ></v-select>

          <v-date-picker
            class="mt-2"
            color="primary"
            width="100%"
            v-model="newTransactionDate"
          ></v-date-picker>
        </v-form>
      </v-card-text>
      <v-card-actions class="mb-3">
        <v-btn
          class="mr-2"
          text="Cancel"
          variant="outlined"
          color="error"
          @click="addNewTransactionModal = false"
        ></v-btn>
        <v-btn
          class="mr-3"
          text="Ok"
          variant="flat"
          color="primary"
          @click="addNewTransaction"
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
class TableDisplay extends Vue {
  loadTableData: boolean = false;
  addNewTransactionModal: boolean = false;
  newTransactionDescription: string = "";
  newTransactionDate: Date = new Date();
  newTransactionType: string = "Other Expenses";
  // the text field converts it to a string - and the calculation breaks if it is a string.
  // as such it gets defined here as a string but converted to a number before saving the amount.
  newTransactionAmount: string = "0";

  get appStore() {
    return useAppStore();
  }
  get graphStore() {
    return useGraphStore();
  }

  get selectedTimeframe() {
    return this.appStore.selectedTimeframe;
  }

  addDummyData() {
    this.loadTableData = true;
    this.appStore.addDummyData();
    this.graphStore.constructData()
    this.loadTableData = false;
  }
  addNewTransaction() {
    this.loadTableData = true;
    this.appStore.addNewTransaction(
      this.newTransactionDescription,
      this.newTransactionDate,
      parseFloat(this.newTransactionAmount),
      this.newTransactionType
    );
    this.newTransactionDescription = "";
    this.newTransactionDate = new Date();
    this.newTransactionType = "Other Expenses";
    this.newTransactionAmount = "0";
    this.graphStore.constructData()
    this.loadTableData = false;
    this.addNewTransactionModal = false;
  }
}
export default toNative(TableDisplay);
</script>
<style></style>
