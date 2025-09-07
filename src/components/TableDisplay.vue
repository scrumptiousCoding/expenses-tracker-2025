<template>
  <v-row>
    <v-col>
      <v-card class="my-0 mx-0">
        <div class="bookmark-right" />
        <div class="card-border">
          <v-card-title class="mb-2">
            History Breakdown
          </v-card-title>
          <v-card-text>
            <v-row class="mb-1">
              <v-col class="py-0">
                <v-text-field
                  v-model="filterDescription"
                  density="compact"
                  variant="outlined"
                  label="Description"
                  hide-details="auto"
                  clearable
                />
              </v-col>
              <v-col class="py-0">
                <v-select
                  v-model="filterTransactionType"
                  :items="appStore.transactionTypes"
                  label="Type"
                  density="compact"
                  hide-details="auto"
                  variant="outlined"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="auto" class="text-right py-0 align-self-center">
                <v-btn
                density="compact"
                size="large"
                variant="outlined"
                color="primary"
                icon="mdi-plus"
                  @click="addNewTransaction()"
                >
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card>
        <v-data-table
          :loading="loadTableData"
          density="compact"
          :headers="headers"
          item-value="type"
          :items="filteredItems"
          items-per-page="20"
        >
          <template #[`item.type`]="{ item }">
            <td>
              <v-chip
                :color="getChipColor(item.type)"
                size="small"
              >
                {{ item.type }} 
              </v-chip>
            </td>
          </template>
          <template #[`item.actions`]="{ item }">
            <td class="d-flex justify-end">
              <v-btn
                size="x-small"
                variant="flat"
                icon="mdi-pencil"
                @click="editItem(item)"
              />
              <v-btn
                size="x-small"
                icon="mdi-trash-can"
                variant="flat"
                @click="confirmDeleteTransaction(item)"
              />
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog
    v-model="transactionModal"
    width="500"
  >
    <transaction-modal
      :transaction="transaction"
      @close-modal="transactionModal = !transactionModal"
      @save-transaction="updateTransaction"
    />
  </v-dialog>

  <v-dialog
    v-model="deleteTransactionModal"
    width="400"
  >
    <delete-transaction-modal
      :transaction="transaction"
      @close-modal="deleteTransactionModal = !deleteTransactionModal"
      @delete-transaction="deleteTransaction"
    />
  </v-dialog>
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import { useGraphStore } from "@/stores/graphStore";
import { useSettingsStore } from "@/stores/settingsStore";
import type { ITransaction } from "@/stores/interfaces/ITimeframe";
import { Component, Vue, toNative } from "vue-facing-decorator";
import TransactionModal from "@/components/Modals/Transaction.vue";
import DeleteTransactionModal from "@/components/Modals/DeleteTransaction.vue";
@Component({
  components: {
    TransactionModal,
    DeleteTransactionModal,
  },
})
class TableDisplay extends Vue {
  loadTableData: boolean = false;
  transactionModal: boolean = false;
  filterTransactionType: string = '';
  filterDescription: string = "";
  transaction: ITransaction = {
    id: null,
    description: "",
    date: new Date(),
    type: "Other Expenses",
    amount: 0,
  };
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
  get filteredItems() {
    if (!this.selectedTimeframe?.transaction) return [];
    let query = this.filterDescription?.toString().toLowerCase() || '';
    let typeFilter = this.filterTransactionType;
    return this.selectedTimeframe.transaction.filter((item: ITransaction) => {
      let matchesType = !typeFilter || item.type === typeFilter;
      let matchesDescription = !query || item.description.toLowerCase().includes(query);
      return matchesType && matchesDescription;
    });
  }
  mounted() {
    if (this.selectedTimeframe !== null) {
      this.minDate = new Date(this.selectedTimeframe.startDate).toLocaleDateString().split('T')[0]
      this.maxDate = new Date(this.selectedTimeframe.endDate).toLocaleDateString().split('T')[0]
    }
  }
  confirmDeleteTransaction(item: ITransaction) {
    this.transaction = item;
    this.deleteTransactionModal = true;
  }
  deleteTransaction() {
    this.appStore.deleteTransaction(this.transaction.id!);
    this.updateTable();
    this.deleteTransactionModal = false;
  }
  addNewTransaction() {
    this.transaction = {
      id: null,
      description: "",
      amount: 0,
      type: "Other Expenses",
      date: new Date(),
    };
    this.transactionModal = true;
  }
  editItem(item: ITransaction) {
    this.transaction = {
      id: item.id,
      description: item.description,
      amount: item.amount,
      type: item.type,
      date: new Date(item.date),
    };
    this.transactionModal = true;
  }
  updateTable() {
    this.loadTableData = true;
    this.graphStore.constructData();
    this.loadTableData = false;
  }
  updateTransaction() {
    if (this.transaction.id === null) {
      this.appStore.addNewTransaction(this.transaction);
    } else {
      this.appStore.updateTransaction(this.transaction);
    }
    this.updateTable();
    this.transactionModal = false;
  }
  filterTableValues (value: any, query: any, item: any ) {
    return value != null &&
      query != null &&
      value.toString().toLocaleUpperCase().indexOf(query) !== -1
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
