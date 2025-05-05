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
    // Helper function to calculate transactions by type (not exposed as a getter)
    _calculateTotalByType(): (type: string) => number {
      return (type: string) => {
        let total = 0
        const transactions = this.selectedTimeframe?.transaction.filter(
          (x) => x.type === type
        ) || []
        for (const transaction of transactions) {
          total += transaction.amount
        }
        return total
      }
    },
    
    getTotalIncome(): number {
      return this._calculateTotalByType("Income")
    },
    
    getTotalFixedExpenses(): number {
      return this._calculateTotalByType("Fixed Expenses")
    },
    
    getTotalOtherExpenses(): number {
      return this._calculateTotalByType("Other Expenses")
    },
    
    getCurrentTotalSavings(): number {
      const savingsDeposits = this._calculateTotalByType("Savings")
      const savingsWithdrawals = this.selectedTimeframe?.savingsTransactions.reduce((total, transaction) => total + transaction.amount, 0) || 0
      return savingsDeposits - savingsWithdrawals
    },
    
    getTotalSavings(): number {
      const currentSavings = this.getCurrentTotalSavings
      const startingBalance = this.selectedTimeframe?.savingsStartingBalance || 0
      return currentSavings + startingBalance
    },
  },
  actions: {
    calculateTotal(type: string): number {
      return this._calculateTotalByType(type)
    },
    
    addNewTimeframe(
      description: string,
      start: Date,
      end: Date,
      startingBalance: number,
      savingsStartingBalance: number
    ): void {
      const newTf = {
        description,
        startDate: start,
        endDate: end,
        startingBalance,
        savingsStartingBalance,
        id: this.timeframes.length,
        transaction: [],
        savingsTransactions: [],
      };
      this.timeframes.push(newTf)
      this.selectedTimeframe = newTf
    },
    
    editTimeframe(
      description: string,
      startDate: Date,
      endDate: Date,
      startingBalance: number,
      savingsStartingBalance: number
    ): void {
      if (!this.selectedTimeframe) return;
      
      Object.assign(this.selectedTimeframe, {
        description,
        startDate,
        endDate,
        startingBalance,
        savingsStartingBalance
      })
    },
    
    deleteTransaction(id: number): void {
      if (!this.selectedTimeframe) return
      const indexedItem = this.selectedTimeframe.transaction.findIndex(x => x.id === id)
      if (indexedItem !== -1) {
        this.selectedTimeframe.transaction.splice(indexedItem, 1)
      }
      // TODO: add error handling for else case
    },
    
    setSelectedTimeframe(tf: ITimeframe): void {
      this.selectedTimeframe = tf
    },
    
    clearTimeframe(): void {
      this.selectedTimeframe = null
    },
    
    addDummyData(): void {
      if (!this.selectedTimeframe) return
      for (let i = 0; i < 5; i++) {
        this.selectedTimeframe.transaction.push({
          description: "Test " + i,
          date: new Date(),
          id: this.selectedTimeframe.transaction.length,
          type: "Other Expenses",
          amount: 1200.32,
        })
      }
    },

    addNewTransaction(transaction: ITransaction): void {
      if (!this.selectedTimeframe) return
      transaction.id = this.selectedTimeframe.transaction.length
      this.selectedTimeframe.transaction.push(transaction)
    },
    
    updateTransaction(transaction: ITransaction): void {
      if (!this.selectedTimeframe) return
      const trans = this.selectedTimeframe.transaction.find(x => x.id === transaction.id)
      if (trans) {
        Object.assign(trans, {
          description: transaction.description,
          date: transaction.date,
          amount: transaction.amount,
          type: transaction.type
        })
      }
    },
    
    removeSavings(transaction: ITransaction): void {
      if (!this.selectedTimeframe) return
      this.selectedTimeframe.savingsTransactions.push({
        description: transaction.description,
        date: transaction.date,
        type: transaction.type,
        amount: transaction.amount,
        id: this.selectedTimeframe.savingsTransactions.length + 1,
      })
    },
    
    updateSavingsTransactions(transaction: ITransaction): void {
      if (!this.selectedTimeframe) return;
      const trans = this.selectedTimeframe.savingsTransactions.find(x => x.id === transaction.id)
      if (trans) {
        Object.assign(trans, {
          description: transaction.description,
          date: transaction.date,
          amount: transaction.amount,
          type: transaction.type
        })
      }
    },
    
    removeTransactionFromSavings(transactionId: number): void {
      if (!this.selectedTimeframe) return
      const indexedItem = this.selectedTimeframe.savingsTransactions.findIndex(x => x.id === transactionId)
      if (indexedItem !== -1) {
        this.selectedTimeframe.savingsTransactions.splice(indexedItem, 1)
      }
      // TODO: add error handling for else case
    },
  },
  persist: true,
});