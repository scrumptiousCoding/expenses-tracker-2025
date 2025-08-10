<template>
  <v-row>
    <v-col lg="2" md="3" sm="4">
      <v-card class="mt-0 mb-3 sticky-note mx-0">
        <v-card-title class="sticky-note-title mb-2">
          History Breakdown
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="filterType"
            density="compact"
            variant="outlined"
            label="Filter Description"
            hide-details="auto"
            class="flex-1-1-100 mb-2"
            clearable
          />
          <v-btn
            class="mb-2"
            block
            @click="addNewTransaction()"
          >
            Add new
          </v-btn>
          <v-btn
            class="mb-2"
            block
            @click="addDummyData"
          > 
            Add Dummy Data
          </v-btn>
          <v-btn
            class="mb-2"
            block
            :color="filterType === '' ? 'primary' : ''"
            @click="filterOnType('All')"
          > 
            Show all 
          </v-btn>
          <v-btn
            class="mb-2"
            block
            :color="filterType === 'Fixed Expenses' ? 'primary' : ''"
            @click="filterOnType('Fixed Expenses')"
          >
            Fixed Expenses
          </v-btn>
          <v-btn
            class="mb-2"
            block
            :color="filterType === 'Other Expenses' ? 'primary' : ''"
            @click="filterOnType('Other Expenses')"
          >
            Other Expenses
          </v-btn>
          <v-btn
            class="mb-2"
            block
            :color="filterType === 'Income' ? 'primary' : ''"
            @click="filterOnType('Income')"
          >
            Income
          </v-btn>
          <v-btn
            class="mb-2"
            block
            :color="filterType === 'Savings' ? 'primary' : ''"
            @click="filterOnType('Savings')"
          >
            Savings
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="10" md="9" sm="8">
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
  transaction: ITransaction = {
    id: null,
    description: "",
    date: new Date(),
    type: "Other Expenses",
    amount: 0,
  };
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
    if (this.transaction.id === null) {
      this.appStore.addNewTransaction(this.transaction);
    } else {
      this.appStore.updateTransaction(this.transaction);
    }
    this.updateTable();
    this.transactionModal = false;
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
