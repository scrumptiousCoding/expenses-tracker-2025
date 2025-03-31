<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <navigation-comp />
      </v-col>
    </v-row>
    <v-row v-if="!selectedTimeframe">
      <v-col class="text-center">
        Please select a timeframe to view
      </v-col>
    </v-row>
    <div v-if="selectedTimeframe">
      <v-row>
        <v-col cols="4">
           <Statistics />
        </v-col>
        <v-col cols="4"> 
          <div v-if="graphStore.seriesData.length <= 0">nothing here yet</div>
          <apexchart v-if="graphStore.seriesData.length > 0" type="donut" :options="options" :series="graphStore.seriesData"></apexchart>
        </v-col>
        <v-col cols="4">
          <v-card class="mb-3">
            <div class="bookmark-right"></div>
            <div class="card-border">
              <v-card-text>
                <v-row align="center" justify="center">
                  <v-col cols="auto" class="pr-0">
                    <v-btn variant="text" class="pa-0" density="compact" icon="mdi-pencil" @click="showModal()"></v-btn>
                  </v-col>
                  <v-col>
                    <p class="info-card-title">
                      {{ selectedTimeframe.description }}
                    </p>
                    <h3>{{ new Date(selectedTimeframe.startDate).toLocaleDateString() }} - {{ new Date(selectedTimeframe.endDate).toLocaleDateString() }}</h3>
                  </v-col>
                </v-row>
              </v-card-text>
            </div>
          </v-card>
          <info-card title="Starting Amount" :amount="selectedTimeframe.startingBalance" />
          <info-card title="Closing Amount" :amount="closingBalance" />
        </v-col>
        <v-col cols="12">
          <TableDisplay />
        </v-col>
      </v-row>
    </div>
    
    <v-dialog v-model="showTimeFrameModal" width="800">
      <time-frame-modal :newTimeFrame="false" @closeModal="showTimeFrameModal = false"/>
    </v-dialog>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import NavigationComp from "@/components/Navigation.vue";
import TimeFrameModal from "@/components/TimeFrameModal.vue";
import { useAppStore } from "@/stores/app";
import Statistics from "@/components/Statistics.vue";
import TableDisplay from "@/components/TableDisplay.vue";
import { useGraphStore } from "@/stores/graphStore";

@Component({
  components: {
    NavigationComp,
    Statistics,
    TableDisplay,
    TimeFrameModal
  }
})
class IndexPage extends Vue {
  options= {
        chart: {
          id: 'expense-chart',
          type: 'pie'
        },
        theme: {
          monochrome: {
            color: '#e2c7f4',
            enabled: true,
          },
        },
        legend: {
          show: false,
        },
        labels: ['Fixed Expenses', 'Other Expenses', 'Savings'],
        dataLabels: {
          formatter(val: any, opts: any) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(2)]
          },
        },
      }
  showTimeFrameModal = false

  mounted() {
    console.log("Main page mounted");
    this.appStore.clearTimeframe()
  }

  get appStore() {
    return useAppStore()
  }

  get graphStore() {
    return useGraphStore()
  }

  get selectedTimeframe() {
    return this.appStore.selectedTimeframe
  }

  get closingBalance() {
    if (this.selectedTimeframe?.startingBalance === undefined) {
      return 0
    }
    return this.selectedTimeframe?.startingBalance - this.appStore.calculateTotal('Other Expenses') - this.appStore.calculateTotal('Fixed Expenses') + this.appStore.calculateTotal('Income')
  }

  showModal() {
    console.log("show modal")
    this.showTimeFrameModal = true
    console.log(this.showTimeFrameModal)
  }
}
export default toNative(IndexPage);
</script>
<style></style>
