<template>
  <v-card>
    <v-card-text>
      <!-- show simple text for starting amount and monthly total -->
      <info-card
        title="Savings Total"
        :amount="getSavingsTotal"
      />
      <v-btn @click="openSavingsModal">
        Withdraw
      </v-btn>
      <v-card class="sticky-note mx-0">
        <v-card-title class="sticky-note-title">
          Account History
        </v-card-title>
        <v-card-text class="pt-2">
          <v-data-table
            :loading="loadTableData"
            density="compact"
            :headers="headers"
            item-value="type"
            :items="selectedTimeframe?.savingsTransactions"
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
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>

  <v-dialog
    v-model="showTransactionModal"
    width="500"
  >
    <transaction-modal
      :transaction="transaction"
      @close-modal="showTransactionModal = !showTransactionModal"
      @save-transaction="saveTransaction"
    />
  </v-dialog>

  <v-dialog
    v-model="deleteTransactionModal"
    width="500"
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
import type { ITransaction } from "@/stores/interfaces/ITimeframe";
import { Component, Vue, toNative } from "vue-facing-decorator";
import TransactionModal from "@/components/Modals/Transaction.vue";
import DeleteTransactionModal from "./DeleteTransaction.vue";

@Component({
  components: {
    TransactionModal,
    DeleteTransactionModal,
  },
})
class SavingsAccountModal extends Vue {
  loadTableData: boolean = false;
  showTransactionModal: boolean = false;
  deleteTransactionModal: boolean = false;
  transaction: ITransaction = {
    id: null,
    description: "",
    amount: 0,
    type: "Other Expenses",
    date: new Date(),
  };

  formatAmount(item: ITransaction) {
    return this.$settingsStore.currencyFormatting(item.amount);
  }

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
      value: (item: ITransaction) => this.formatAmount(item),
    },
    { title: "", key: "actions" },
  ];

  get appStore() {
    return useAppStore();
  }
  get selectedTimeframe() {
    return this.appStore.selectedTimeframe;
  }

  get getSavingsTotal() {
    return this.appStore.getTotalSavings;
  }

  saveTransaction(transaction: ITransaction) {
    if (transaction.id === null) {
      this.appStore.removeSavings(transaction);
    } else {
      this.appStore.updateSavingsTransactions(transaction);
    }
    this.showTransactionModal = false;
  }
  openSavingsModal() {
    this.transaction = {
      id: null,
      description: "",
      amount: 0,
      type: "Other Expenses",
      date: new Date(),
    };
    this.showTransactionModal = true;
  }
  editItem(item: ITransaction) {
    this.transaction = { ...item };
    this.showTransactionModal = true;
  }
  confirmDeleteTransaction(item: ITransaction) {
    this.transaction = item;
    this.deleteTransactionModal = true;
  }
  deleteTransaction() {
    this.appStore.deleteSavingsTransaction(this.transaction.id!);
    this.deleteTransactionModal = false;
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
export default toNative(SavingsAccountModal);
</script>
