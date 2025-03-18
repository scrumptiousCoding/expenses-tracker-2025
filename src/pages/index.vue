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
          <v-card>
            <v-card-text>
              Notes
              - this assumes that savings are in a seperate account and putting something in savings effectively removes it from your account
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <TableDisplay />
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>
<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import NavigationComp from "@/components/Navigation.vue";
import { useAppStore } from "@/stores/app";
import Statistics from "@/components/Statistics.vue";
import TableDisplay from "@/components/TableDisplay.vue";
import { useGraphStore } from "@/stores/graphStore";

@Component({
  components: {
    NavigationComp,
    Statistics,
    TableDisplay
  }
})
class IndexPage extends Vue {
  options= {
        chart: {
          id: 'vuechart-example'
        },
        pie: {
          donut: {
            labels: 
            {
              show: true,
              name: {
                show: true
              },
              value: {
                show: true
              }
            }
          }
        },
        labels: ['Fixed Expenses', 'Other Expenses', 'Savings']
      }
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
}
export default toNative(IndexPage);
</script>
<style></style>
