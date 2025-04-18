<template>
  <v-row>
    <v-col cols="2">
      <v-card class="mt-0 mb-3 sticky-note mx-0">
        <v-card-title class="sticky-note-title mb-2">
          History Breakdown
        </v-card-title>
        <v-card-text>
          <v-text-field
            density="compact"
            variant="outlined"
            label="Search"
            hide-details="auto"
            class="flex-1-1-100 mb-2"
            clearable
            v-model="filterType"
          ></v-text-field>
          <v-btn class="mb-2" block @click="addNewTransaction()">
            Add new
          </v-btn>
          <v-btn class="mb-2" block @click="addDummyData"> 
            Add Dummy Data
          </v-btn>
          <v-btn
            class="mb-2"
            block
            @click="filterOnType('All')"
            :color="filterType === '' ? 'primary' : ''"
            > 
            Show all 
          </v-btn>
          <v-btn
            class="mb-2"
            block
            @click="filterOnType('Fixed Expenses')"
            :color="filterType === 'Fixed Expenses' ? 'primary' : ''"
          >
            Fixed Expenses
          </v-btn>
          <v-btn
            class="mb-2"
            block
            @click="filterOnType('Other Expenses')"
            :color="filterType === 'Other Expenses' ? 'primary' : ''"
          >
            Other Expenses
          </v-btn>
          <v-btn
            class="mb-2"
            block
            @click="filterOnType('Income')"
            :color="filterType === 'Income' ? 'primary' : ''"
          >
            Income
          </v-btn>
          <v-btn
            class="mb-2"
            block
            @click="filterOnType('Savings')"
            :color="filterType === 'Savings' ? 'primary' : ''"
          >
            Savings
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="10">
      <v-card>
        <v-data-table
          :loading="loadTableData"
          density="compact"
          :headers="headers"
          :search="filterType"
          item-value="type"
          :items="selectedTimeframe?.transaction"
          items-per-page="20"
        >
          <template v-slot:item.type="{ item }">
            <td>
              <v-chip :color="getChipColor(item.type)" size="small">
                {{ item.type }} 
              </v-chip>
            </td>
          </template>
          <template v-slot:item.actions="{ item }">
            <td class="d-flex justify-end">
              <v-btn
                size="x-small"
                @click="editItem(item)"
                variant="flat"
                icon="mdi-pencil"
              ></v-btn>
              <v-btn
                size="x-small"
                @click="confirmDeleteTransaction(item)"
                icon="mdi-trash-can"
                variant="flat"
              ></v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="addNewTransactionModal" width="600">
    <v-card
      prepend-icon="mdi-calendar-clock"
      :title="transactionId === -1 ? 'Add new transaction' : 'Edit transaction'"
    >
      <v-card-text class="pb-0">
        <v-form class="d-flex flex-wrap">
          <v-text-field
            density="compact"
            variant="outlined"
            label="Description"
            hide-details="auto"
            class="flex-1-1-100"
            v-model="transactionDescription"
          ></v-text-field>
          <v-text-field
            density="compact"
            variant="outlined"
            label="Amount"
            type="number"
            hide-details="auto"
            class="mt-2 flex-1-1-100"
            v-model="transactionAmount"
          ></v-text-field>

          <v-select
            v-model="transactionType"
            :items="appStore.transactionTypes"
            class="mt-2 flex-1-1-100"
            variant="outlined"
            hide-details="auto"
            density="compact"
            label="Select a type of transaction"
            single-line
          ></v-select>
          <v-alert
            v-if="transactionType === 'Savings'"
            class="mt-2"
            color="info"
            density="compact"
            text="This assumes that savings are in a seperate account and putting something in savings effectively removes it from your account, treating it like an expense. But without the bad colous attached to it"
          ></v-alert>

          <v-date-picker
            class="mt-2"
            color="primary"
            width="100%"
            v-model="transactionDate"
            :min="minDate"
            :max="maxDate"
          ></v-date-picker>
        </v-form>
      </v-card-text>
      <v-card-actions class="mb-3 mx-1">
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
          @click="updateTransaction"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="deleteTransactionModal" width="400">
    <v-card prepend-icon="mdi-calendar-clock" title="Delete transaction">
      <v-card-text class="pb-0">
        <p>
          Are you sure you want to delete
          <span class="font-weight-bold">{{ transactionDescription }}</span>
          with a total of
          <span class="font-weight-bold">R {{ transactionAmount }}</span
          >?
        </p>
      </v-card-text>
      <v-card-actions class="mb-3 mx-1">
        <v-btn
          class="mr-2"
          text="Cancel"
          variant="outlined"
          color="error"
          @click="deleteTransactionModal = false"
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
  </v-dialog>
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import { useGraphStore } from "@/stores/graphStore";
import { useSettingsStore } from "@/stores/settingsStore";
import type { ITransaction } from "@/stores/interfaces/ITimeframe";
import { Component, Vue, toNative } from "vue-facing-decorator";
@Component
class TableDisplay extends Vue {
  loadTableData: boolean = false;
  addNewTransactionModal: boolean = false;
  transactionId: number = -1;
  transactionDescription: string = "";
  transactionDate: Date = new Date();
  transactionType: string = "Other Expenses";
  // the text field converts it to a string - and the calculation breaks if it is a string.
  // as such it gets defined here as a string but converted to a number before saving the amount.
  transactionAmount: string = "0";
  filterValue: string = "";
  deleteTransactionModal: boolean = false;

  headers = [
    {
      title: "Date",
      key: "date",
      value: (item: ITransaction) => {
        return new Date(item.date).toLocaleDateString();
      },
    },
    { title: "Description", value: "description" },
    { title: "Type", value: "type" },
    {
      title: "Amount",
      key: "amount",
      value: (item: ITransaction) => {
        return this.settingsStore.currencyFormatting(item.amount);
      },
    },
    { title: "", key: "actions"},
  ];
  filterType = "";
  minDate: string = '';
  maxDate: string = '';

  get appStore() {
    return useAppStore();
  }
  get graphStore() {
    return useGraphStore();
  }
  get settingsStore() {
    return useSettingsStore()
  }
  get selectedTimeframe() {
    return this.appStore.selectedTimeframe;
  }
  mounted() {
    if (this.selectedTimeframe !== null) {
      this.minDate = new Date(this.selectedTimeframe.startDate).toLocaleDateString().split('T')[0]
      this.maxDate = new Date(this.selectedTimeframe.endDate).toLocaleDateString().split('T')[0]
    }
  }
  confirmDeleteTransaction(item: ITransaction) {
    this.transactionDescription = item.description;
    this.transactionAmount = item.amount.toString();
    this.transactionId = item.id;
    this.deleteTransactionModal = true;
  }
  deleteTransaction() {
    this.appStore.deleteTransaction(this.transactionId);
    this.updateTable();
    this.deleteTransactionModal = false;
  }
  addNewTransaction() {
    this.transactionAmount = "0";
    this.transactionDescription = "";
    this.transactionDate = new Date();
    this.transactionType = "Other Expenses";
    this.addNewTransactionModal = true;
    this.transactionId = -1;
  }
  editItem(item: ITransaction) {
    this.transactionAmount = item.amount.toString();
    this.transactionDescription = item.description;
    this.transactionDate = new Date(item.date);
    this.transactionType = item.type;
    this.transactionId = item.id;
    this.addNewTransactionModal = true;
  }
  addDummyData() {
    this.appStore.addDummyData();
    this.updateTable();
  }
  updateTable() {
    this.loadTableData = true;
    this.graphStore.constructData();
    this.loadTableData = false;
  }
  updateTransaction() {
    if (this.transactionId == -1) {
      this.appStore.addNewTransaction(
        this.transactionDescription,
        this.transactionDate,
        parseFloat(this.transactionAmount),
        this.transactionType
      );
    } else {
      this.appStore.updateTransaction(
        this.transactionId,
        this.transactionDescription,
        this.transactionDate,
        parseFloat(this.transactionAmount),
        this.transactionType
      );
    }
    this.updateTable();
    this.addNewTransactionModal = false;
  }
  filterOnType(type: string) {
    if (type === "All") {
      this.filterType = "";
    } else {
      this.filterType = type;
    }
  }
  getChipColor(type: string) {
    switch (type) {
      case "Fixed Expenses":
        return "red";
      case "Other Expenses":
        return "blue";
      case "Income":
        return "green";
      case "Savings":
        return "orange";
      default:
        return "grey";
    }
  }
}
export default toNative(TableDisplay);
</script>
<style></style>
