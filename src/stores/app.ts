// Utilities
import { defineStore } from 'pinia'
import type { ITimeframe } from './interfaces/ITimeframe'
import type { ITransaction } from './interfaces/ITimeframe'

export interface ISystemStore {
  timeframes: ITimeframe[]
  selectedTimeframe: ITimeframe | null
}

export const useAppStore = defineStore('app', {
  state: (): ISystemStore => ({
    timeframes: [],
    selectedTimeframe: null
  }),
  getters: {
    getTimeframeOptions(state) {
      return state.timeframes
    },
    getTotalIncome(state){
      let total: number = 0
      let filter = state.selectedTimeframe?.transaction.filter((x) => x.type === 'Income')
      if (filter !== undefined) {
        for (let i = 0; i < filter.length; i++) {
          const element = filter[i];
          total += element.amount
        }
      }
      return total
    },
    getTotalFixedExpenses(state){
      let total: number = 0
      let filter = state.selectedTimeframe?.transaction.filter((x) => x.type === 'Fixed Expenses')
      if (filter !== undefined) {
        for (let i = 0; i < filter.length; i++) {
          const element = filter[i];
          total += element.amount
        }
      }
      return total
    },
    getTotalOtherExpenses(state){
      let total: number = 0
      let filter = state.selectedTimeframe?.transaction.filter((x) => x.type === 'Other Expenses')
      if (filter !== undefined) {
        for (let i = 0; i < filter.length; i++) {
          const element = filter[i];
          total += element.amount
        }
      }
      return total
    },
    getTotalSavings(state){
      let total: number = 0
      let filter = state.selectedTimeframe?.transaction.filter((x) => x.type === 'Savings')
      if (filter !== undefined) {
        for (let i = 0; i < filter.length; i++) {
          const element = filter[i];
          total += element.amount
        }
      }
      return total
    },
  },
  actions: {
    addNewTimeframe(description: string, start: Date, end: Date) {
      const newTf = {
        description: description,
        startDate: start,
        endDate: end,
        id: this.timeframes.length,
        transaction: []
      }
      this.timeframes.push(newTf)
    },
    setSelectedTimeframe(tf: ITimeframe) {
      this.selectedTimeframe = tf
    },
    clearTimeframe(){
      this.selectedTimeframe = null
    },
    addDummyTimeframe(){
      for (let j = 0; j < 5; j++) {
        this.timeframes.push({
          
    description: 'testing '+ j,
    startDate: new Date,
    endDate: new Date,
    id: this.timeframes.length,

    transaction: []

        })
      }
    },
    addDummyData(){
      if (this.selectedTimeframe) {
        for (let i = 0; i < 5; i++) {
          this.selectedTimeframe.transaction.push({
            description: "Test " + i,
            date: new Date(),
            id: this.selectedTimeframe.transaction.length,
            type: 'Other Expenses',
            amount: 1200.32
          })
        }
      }
    },
    addNewTransaction(description:string, date: Date, amount: number, type: string){
      this.selectedTimeframe?.transaction.push(
        {
          description: description,
          date: date,
          type: type,
          amount: amount,
          id: this.selectedTimeframe.transaction.length
        }
      )
    }
  },
  // persist: {
  //   paths: {}
  // }
})
