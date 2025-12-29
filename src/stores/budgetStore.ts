import { defineStore } from "pinia";

interface IBudgetingTimelines {
    description: string,
    id: number,
    startDate: Date,
    endDate: Date,
    bankStartingBalance: number,
    savingsStartingBalance: number,
    backedUp: boolean,
    savingAccounts: IGeneralAccount[],
    billsAccounts: IGeneralAccount[],
    incomeAccounts: IGeneralAccount[],
    spendingAccounts: IGeneralAccount[]
}

interface IGeneralAccount {
    description: string,
    budgetAmount: number,
    alwaysShow: boolean, //hide some of the tables that you dont always use
    notes: string, // add notes to help you remember what this category is for
    transactions: ITransactions[]
}

interface ITransactions {
    description: string
    date: Date
    type: string
    id: number | null
    amount: number
}

export interface IBudgetStore {
    budgetingTimelines: IBudgetingTimelines[]
}

export const useBudgetStore = defineStore("budgetStore", {
  state: (): IBudgetStore => ({
    budgetingTimelines: []
  }),
  getters: {},
  actions: {
  },
  persist: true
});
