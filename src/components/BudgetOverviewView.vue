<template>
    <div>
          <v-row>
            <v-col cols="4">
              <v-card class="h-100" image="https://i.pinimg.com/1200x/89/26/7f/89267f0a43554f842ef8d1a6e9295bc7.jpg" >
                <div class="d-flex align-start pa-4 h-100" >
                  <v-card class="flex-grow-1">
                    <div class="bookmark-right" />
                    <div class="card-border">
                      <v-card-text>
                        <h3>Under budget!</h3>
                      </v-card-text>
                    </div>
                  </v-card>
                </div>
              </v-card>
            </v-col>
            <v-col cols="4">
              <info-card-with-button title="Timeframe description"
                secondaryText="20/10/2025 - 30/10/2025"
                icon="mdi-pencil"
                @actionItem="" />
              
              <apexchart
                type="pie"
                :options="options"
                :series="seriesData"
              />
            </v-col>
            <v-col cols="4">
              <v-card>
                <v-card-title class="sticky-note-header">
                  Savings Details
                </v-card-title>
                <v-card-text class="sticky-note-body">
                  <v-data-table
                    density="compact"
                    :headers="headers"
                    item-value="type"
                    :items="items" 
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card-text>
              </v-card>
              <v-card class="mt-4">
                <v-card-title class="sticky-note-header">
                  Spending Details
                </v-card-title>
                <v-card-text class="sticky-note-body">
                  <v-data-table
                    density="compact"
                    :headers="headers"
                    item-value="type"
                    :items="items" 
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { useBudgetStore } from "@/stores/budgetStore";
import InfoCardWithButton from "./SmallBits/InfoCardWithButton.vue";

@Component({
  components: {
    InfoCardWithButton
  }
})
class BudgetOverviewView extends Vue {
  seriesData = [25,75]
  options = {
    chart: {
      id: "expense-chart",
      type: "pie",
    },
    theme: {
      monochrome: {
        color: "#e7b083",
        enabled: true,
      },
    },
    legend: {
      show: false,
    },
    labels: ["Fixed Expenses", "Other Expenses", "Savings"],
    dataLabels: {
      formatter(val: number, opts: { w: { globals: { labels: string[] } }, seriesIndex: number }) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(2)];
      },
    },
  };
  headers = [
    { title: "name", value: "name" },
    { title: "calories", value: "calories" },
    { title: "", key: "actions"}
  ]
  items = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          }
        ]

  get budgetStore() {
    return useBudgetStore();
  }
}
export default toNative(BudgetOverviewView);
</script>