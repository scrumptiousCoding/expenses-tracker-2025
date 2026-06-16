import { defineStore } from "pinia";
import type { IBudget } from "./interfaces/IBudgetDefinitions";

export interface IBudgetStore {
  budgetTimeframes: IBudget[];
  selectedBudgetTimeframe: IBudget | null
}

export const useBudgetStore = defineStore("budgetStore", {
  state: (): IBudgetStore => ({
    budgetTimeframes: [],
    selectedBudgetTimeframe: null
  }),
  getters: {
    getClosingAmount() : number {
        return 0
    }
  },
  actions: {
    addNewTimeframe(newBudget: IBudget) : void {
        const newId = this.budgetTimeframes.length > 0 ? this.budgetTimeframes[this.budgetTimeframes.length - 1].id + 1 : 1;
        newBudget.id = newId
        this.budgetTimeframes.push(newBudget)
        this.selectedBudgetTimeframe = newBudget
    },

    clearBudgetTimeframe() {
      this.selectedBudgetTimeframe = null
    }
  },
  persist: true
});
