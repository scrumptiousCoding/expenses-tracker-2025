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
    }
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
    addNewTransaction(newTransaction: ITransaction){
      this.selectedTimeframe?.transaction.push(
        {
          description: newTransaction.description,
          date: newTransaction.date,
          type: newTransaction.type,
          amount: newTransaction.amount,
          id: this.selectedTimeframe.transaction.length
        }
      )
    }
  },
  // persist: {
  //   paths: {}
  // }
})
