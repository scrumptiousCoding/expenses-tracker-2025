<template>
    <div>
      <v-row>
        <v-col cols="2" class="d-flex flex-column">
              <v-card class="flex-grow-1" image="https://i.pinimg.com/1200x/89/26/7f/89267f0a43554f842ef8d1a6e9295bc7.jpg">
                <div class="d-flex align-start pa-4 h-100" >
                  <v-card class="flex-grow-1">
                    <div class="bookmark-right" />
                    <div class="card-border">
                      <v-card-text>
                        <h3>Change goals</h3>
                      </v-card-text>
                    </div>
                  </v-card>
                </div>
              </v-card>
        </v-col>
        <v-col cols="10">
          <v-row>
            <v-col>
              <v-card>
                <div class="bookmark-right" />
                <div class="card-border">
                  <v-card-text>
                    <h4 class="mb-2">No Spend days</h4>
                    <div class="d-flex justify-start flex-wrap">
                      <v-sheet
                        v-for="n in 50"
                        :key="n"
                        class=""
                      >
                        <v-img
                          src="@/assets/fallTheme/toastie.png"
                          alt="Toastie"
                          contain
                          width="56"
                          height="56"
                        />
                        <v-img
                          src="@/assets/fallTheme/toastieButt.png"
                          alt="Toastie"
                          contain
                          width="56"
                          height="56"
                        />
                      </v-sheet>
                    </div>
                  </v-card-text>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
          <v-card>
            <div class="bookmark-right" />
            <div class="card-border">
              <v-card-text>
                <h4 class="mb-2">Stay under budget!</h4>
                <v-progress-linear
                  v-model="spending"
                  color="purple"
                  height="15"
                  rounded="lg"
                  clickable
                ></v-progress-linear>
              </v-card-text>
            </div>
          </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card>
                <div class="bookmark-right" />
                <div class="card-border">
                  <v-card-text>
                    <h4 class="mb-2">Savings Goals</h4>
                    <v-row>
                      <v-col cols="3" v-for="i in 5">
                        <v-sheet style="background-color: blanchedalmond;" class="pt-2">
                          <div class="px-4">
                            <h5>Marketlink Savings Account</h5>
                            <span style="font-size: xx-large;">R 90.00 <span style="font-size: large;">/R 300.00</span></span>
                          </div>
                          <div class="px-4 py-2 text-center" style="background-color: coral;">
                            working on it
                          </div>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </div>
              </v-card>
            </v-col>
          </v-row>
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
class BudgetGoalsAndSettings extends Vue {
  spending = 30
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
export default toNative(BudgetGoalsAndSettings);
</script>