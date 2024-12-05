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
              Achievements
              <ul>
                <li>no spending streak</li>
                <li>minimum spending month</li>
                <li>extra income achievements</li>
                <li>checkin</li>
                <li>https://www.creditkarma.com/money/i/money-saving-challenges</li>
              </ul>
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
        labels: this.graphStore.labels
      }
  mounted() {
    console.log("Main page mounted");
    this.graphStore.constructData()
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
