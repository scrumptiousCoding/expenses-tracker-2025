import { defineStore } from "pinia";
import { useAppStore } from "./app";

export interface IGraphStore{
    seriesData: number[],
    labels: string[],
    appStore: any
}

export const useGraphStore = defineStore('graphStore', {
    state: () : IGraphStore => ({
        seriesData: [],
        labels: [],
        appStore: useAppStore()
    }),
    getters: {
    },
    actions: {
        constructLabels() {
            this.labels = []
            for (let i = 0; i < this.appStore.transactionTypes.length; i++) {
                const transType = this.appStore.transactionTypes[i]
                if (transType !== "Income") {
                    this.labels.push(transType)
                }
            }
        },
        constructData(){
            this.seriesData = []
            for (let i = 0; i < this.appStore.transactionTypes.length; i++) {
                const transType = this.appStore.transactionTypes[i]
                if (transType !== "Income") {
                    let amt = this.appStore.calculateTotal(transType)
                    this.seriesData.push(amt)
                }
            }
        }
    }
})