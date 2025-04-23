// Utilities
import { defineStore } from "pinia";
import type { ITimeframe } from "./interfaces/ITimeframe";
import type { ITransaction } from "./interfaces/ITimeframe";

export interface ISystemStore {
  timeframes: ITimeframe[];
  selectedTimeframe: ITimeframe | null;
  transactionTypes: string[];
  firstLoad: boolean;
}

export const useAppStore = defineStore("app", {
  state: (): ISystemStore => ({
    timeframes: [],
    selectedTimeframe: null,
    transactionTypes: ["Income", "Fixed Expenses", "Other Expenses", "Savings"],
    firstLoad: true,
  }),
  getters: {
    getTotalIncome(state) {
      let total: number = 0;
      let filter = state.selectedTimeframe?.transaction.filter(
        (x) => x.type === "Income"
      );
      if (filter !== undefined) {
        for (let i = 0; i < filter.length; i++) {
          const element = filter[i];
          total += element.amount;
        }
      }
      return total;
    },
    getTotalFixedExpenses(state) {
      let total: number = 0;
      let filter = state.selectedTimeframe?.transaction.filter(
        (x) => x.type === "Fixed Expenses"
      );
      if (filter !== undefined) {
        for (let i = 0; i < filter.length; i++) {
          const element = filter[i];
          total += element.amount;
        }
      }
      return total;
    },
    getTotalOtherExpenses(state) {
      let total: number = 0;
      let filter = state.selectedTimeframe?.transaction.filter(
        (x) => x.type === "Other Expenses"
      );
      if (filter !== undefined) {
        for (let i = 0; i < filter.length; i++) {
          const element = filter[i];
          total += element.amount;
        }
      }
      return total;
    },
    getCurrentTotalSavings(state) {
      let total: number = 0;
      let filter = state.selectedTimeframe?.transaction.filter(
        (x) => x.type === "Savings"
      );
      if (filter !== undefined) {
        for (let i = 0; i < filter.length; i++) {
          const element = filter[i];
          total += element.amount;
        }
      }
      for (
        let i = 0;
        i < (state.selectedTimeframe?.savingsTransactions.length || 0);
        i++
      ) {
        total -= state.selectedTimeframe?.savingsTransactions[i].amount || 0;
      }
      return total;
    },
    getTotalSavings(state) {
      let total: number = 0;
      let filter = state.selectedTimeframe?.transaction.filter(
        (x) => x.type === "Savings"
      );
      if (filter !== undefined) {
        for (let i = 0; i < filter.length; i++) {
          const element = filter[i];
          total += element.amount;
        }
      }
      for (
        let i = 0;
        i < (state.selectedTimeframe?.savingsTransactions.length || 0);
        i++
      ) {
        total -= state.selectedTimeframe?.savingsTransactions[i].amount || 0;
      }

      return total + (state.selectedTimeframe?.savingsStartingBalance || 0);
    },
  },
  actions: {
    calculateTotal(type: string) {
      let total: number = 0;
      let filter = this.selectedTimeframe?.transaction.filter(
        (x) => x.type === type
      );
      if (filter !== undefined) {
        for (let i = 0; i < filter.length; i++) {
          const element = filter[i];
          total += element.amount;
        }
      }
      return total;
    },
    addNewTimeframe(
      description: string,
      start: Date,
      end: Date,
      startingBalance: number,
      savingsStartingBalance: number
    ) {
      const newTf = {
        description: description,
        startDate: start,
        endDate: end,
        startingBalance: startingBalance,
        savingsStartingBalance: savingsStartingBalance,
        id: this.timeframes.length,
        transaction: [],
        savingsTransactions: [],
      };
      this.timeframes.push(newTf);
    },
    editTimeframe(
      description: string,
      startDate: Date,
      endDate: Date,
      startingBalance: number,
      savingsStartingBalance: number
    ) {
      if (!this.selectedTimeframe) return;
      this.selectedTimeframe.description = description;
      this.selectedTimeframe.startDate = startDate;
      this.selectedTimeframe.endDate = endDate;
      this.selectedTimeframe.startingBalance = startingBalance;
      this.selectedTimeframe.savingsStartingBalance = savingsStartingBalance;
    },
    deleteTransaction(id: number) {
      let indexedItem = this.selectedTimeframe?.transaction.findIndex(
        (x) => x.id === id
      );
      if (indexedItem !== undefined) {
        this.selectedTimeframe?.transaction.splice(indexedItem, 1);
      } else {
        //TODO: add error handling
      }
    },
    setSelectedTimeframe(tf: ITimeframe) {
      this.selectedTimeframe = tf;
    },
    clearTimeframe() {
      this.selectedTimeframe = null;
    },
    addDummyData() {
      if (this.selectedTimeframe) {
        for (let i = 0; i < 5; i++) {
          this.selectedTimeframe.transaction.push({
            description: "Test " + i,
            date: new Date(),
            id: this.selectedTimeframe.transaction.length,
            type: "Other Expenses",
            amount: 1200.32,
          });
        }
      }
    },
    addNewTransaction(
      description: string,
      date: Date,
      amount: number,
      type: string
    ) {
      this.selectedTimeframe?.transaction.push({
        description: description,
        date: date,
        type: type,
        amount: amount,
        id: this.selectedTimeframe.transaction.length,
      });
    },
    updateTransaction(
      id: number,
      description: string,
      date: Date,
      amount: number,
      type: string
    ) {
      if (this.selectedTimeframe) {
        const transaction = this.selectedTimeframe.transaction.find(
          (x) => x.id === id
        );
        if (transaction) {
          transaction.description = description;
          transaction.date = date;
          transaction.amount = amount;
          transaction.type = type;
        }
      }
    },
    //savings transactions
    removeSavings(transaction: ITransaction) {
      this.selectedTimeframe?.savingsTransactions.push({
        description: transaction.description,
        date: transaction.date,
        type: transaction.type,
        amount: transaction.amount,
        id: this.selectedTimeframe.savingsTransactions.length + 1,
      });
    },
    updateSavingsTransactions(transaction: ITransaction) {
      const trans = this.selectedTimeframe!.savingsTransactions.find(
        (x) => x.id === transaction.id
      );
      if (trans) {
        trans.description = transaction.description;
        trans.date = transaction.date;
        trans.amount = transaction.amount;
        trans.type = transaction.type;
      }
    },
    removeTransactionFromSavings(transactionId: number) {
      let indexedItem = this.selectedTimeframe?.savingsTransactions.findIndex(
        (x) => x.id === transactionId
      );
      if (indexedItem !== undefined) {
        this.selectedTimeframe?.savingsTransactions.splice(indexedItem, 1);
      } else {
        //TODO: add error handling
      }
    },
  },
  persist: true,
});
