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
        constructData(){
            this.seriesData = []
            this.labels = []
            for (let i = 0; i < this.appStore.transactionTypes.length; i++) {
              let amt = this.appStore.calculateTotal(this.appStore.transactionTypes[i])
              this.seriesData.push(amt)
              this.labels.push(this.appStore.transactionTypes[i])
            }
            console.log('amt 3', this.seriesData);
            console.log('asdaf',this.labels);
            
        }
    }
})