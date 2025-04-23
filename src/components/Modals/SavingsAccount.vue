<template>
  <v-card>
    <v-card-text>
      <!-- show simple text for starting amount and monthly total -->
      <info-card title="Savings Total" :amount="getSavingsTotal" />
      <v-btn @click="openSavingsModal"> Withdraw</v-btn>
      <v-card class="sticky-note mx-0">
        <v-card-title class="sticky-note-title">Account History</v-card-title>
        <v-card-text class="pt-2">
          <v-data-table
            :loading="loadTableData"
            density="compact"
            :headers="headers"
            item-value="type"
            :items="selectedTimeframe?.savingsTransactions"
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
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>

  <v-dialog v-model="showTransactionModal" width="500">
    <transaction-modal
      :transaction="transaction"
      @closeModal="showTransactionModal = !showTransactionModal"
      @saveTransaction="saveTransaction"
    />
  </v-dialog>

  <v-dialog v-model="deleteTransactionModal" width="500">
    <delete-transaction-modal
      :transaction="transaction"
      @closeModal="deleteTransactionModal = !deleteTransactionModal"
      @deleteTransaction="deleteTransaction"
    />
  </v-dialog>
</template>

<script lang="ts">
import { useAppStore } from "@/stores/app";
import type { ITransaction } from "@/stores/interfaces/ITimeframe";
import { useSettingsStore } from "@/stores/settingsStore";
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
    { title: "", key: "actions" },
  ];

  get appStore() {
    return useAppStore();
  }
  get settingsStore() {
    return useSettingsStore();
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
  closeModal() {
    this.$emit("closeModal");
  }

  confirmDeleteTransaction(item: ITransaction) {
    this.transaction = item;
    this.deleteTransactionModal = true;
  }
  deleteTransaction() {
    this.appStore.removeTransactionFromSavings(this.transaction.id!);
    this.deleteTransactionModal = false;
  }
  editItem(item: ITransaction) {
    //dont just assign the item to transaction, create a new object with the same values
    // to avoid mutating the original object
    this.transaction = {
      id: item.id,
      description: item.description,
      amount: item.amount,
      type: item.type,
      date: new Date(item.date),
    };
    this.showTransactionModal = true;
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
