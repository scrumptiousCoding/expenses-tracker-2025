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
          <apexchart type="donut" :options="options" :series="series"></apexchart>
        </v-col>
        <v-col cols="4">
          <apexchart type="donut" :options="options" :series="series"></apexchart>
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
            labels: {
              show: true,
              name: {
                show: true
              },
              value: {
                show: true
              }
            }
          }
        }
      }

      series= [30, 40, 45, 50, 49, 60, 70, 91]
  mounted() {
    console.log("Main page mounted");
  }

  get appStore() {
    return useAppStore()
  }

  get selectedTimeframe() {
    return this.appStore.selectedTimeframe
  }
}
export default toNative(IndexPage);
</script>
<style></style>
