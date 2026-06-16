<template>
    <div>
          <v-row>
              <v-col cols="4" class="d-flex flex-column">
                  <v-card>
                    <v-card-title class="sticky-note-header pb-5">
                      Overview
                    </v-card-title>
                    <v-card-text class="sticky-note-body">
                      <budget-label :description="'Savings Balance'" :amount="13791.44" :tonal="true" :spent="0" />
                      <budget-label 
                          v-for="(item, index) in selectedTimeframe?.savings" :key="index" 
                          :description="item.description" :amount="item.amount" :spent="0"/>
                      <budget-label :description="'Ending Savings Balance'" :amount="13791.44" :spent="0" :tonal="true" />
                      <budget-label :description="'Account Balance'" :amount="13791.44" :tonal="true" />
                      <budget-label :description="'Income'" :amount="13791.44" :tonal="true" />
                      <!-- <budget-label 
                          v-for="(item, index) in budgetingTimelines.savingAccounts" :key="index" 
                          :description="item.description" :amount="item.budgetAmount" /> -->
                      <budget-label :description="'Bills'" :amount="13791.44" :spent="0" :tonal="true" />
                      <budget-label 
                          v-for="(item, index) in selectedTimeframe?.bills" :key="index" 
                          :description="item.description" :amount="item.amount" :spent="0"/>
                      <budget-label :description="'Other Spending'" :amount="13791.44" :spent="0" :tonal="true" />
                      <budget-label 
                          v-for="(item, index) in selectedTimeframe?.expenses" :key="index" 
                          :description="item.description" :amount="item.amount" :spent="0"/>
                      <budget-label :description="'Ending Account Balance'" :amount="13791.44" :tonal="true" />
                    </v-card-text>
                  </v-card>

              <v-card class="mt-5 flex-grow-1" image="https://i.pinimg.com/1200x/89/26/7f/89267f0a43554f842ef8d1a6e9295bc7.jpg">
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
              <v-col cols="8">
                <v-row>
                  <v-col cols="6">
                    <info-card
                      title="Starting Amount"
                      :amount="selectedTimeframe?.startingBalance"
                    />
                  </v-col>
                  <v-col cols="6">
                    <info-card
                      title="Closing Amount"
                      :amount="appStore.getClosingAmount"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="pt-0">
                    <v-card>
                      <div class="card-border pt-4">
                        <v-card-text>
                          <v-row class="mb-1">
                            <v-col class="py-0">
                              <v-btn block color="primary">Add</v-btn>
                            </v-col>
                            <v-col class="py-0">
                              <v-btn block color="primary">Show/hide all</v-btn>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" v-for="(item, index) in selectedTimeframe!.bills" :key="index">
                    <v-expansion-panels
                      :rounded="[20, 8]"
                      gap="8"
                      variant="accordion"
                      static
                    >
                      <v-expansion-panel  v-for="(item, index) in selectedTimeframe!.bills" :key="index">
                        <v-expansion-panel-title>
                          {{ item.description }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-data-table
                            density="compact"
                            :headers="headers"
                            item-value="type"
                            :items="item.transactions" 
                            hide-default-footer
                          >
                        </v-data-table>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>

                    <v-card>
                      <v-card-title class="sticky-note-header d-flex ">
                        <span class=" me-auto">{{ item.description }}</span>
                        <v-btn @click="expandDisplay = !expandDisplay" variant="text">
                          <v-icon v-if="expandDisplay">mdi-window-minimize</v-icon>
                          <v-icon v-if="!expandDisplay">mdi-window-maximize</v-icon>
                        </v-btn>
                      </v-card-title>
                      <v-card-text class="sticky-note-body" v-if="expandDisplay">
                        <v-data-table
                          density="compact"
                          :headers="headers"
                          item-value="type"
                          :items="item.transactions" 
                          hide-default-footer
                        >
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
          </v-row>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import BudgetLabel from "@/components/SmallBits/BudgetLabel.vue";
import { useBudgetStore } from "@/stores/budgetStore";
import InfoCard from "./SmallBits/InfoCard.vue";

@Component({
  components: {
    BudgetLabel,
    InfoCard
  }
})
class BudgetSelectionView extends Vue {
  expandDisplay: boolean = false
  headers = [
    { title: "Description", value: "description" },
    { title: "Date", value: "date" },
    { title: "Amount", value: "amount" },
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
          }
        ]

  get appStore() {
    return useBudgetStore();
  }
  
  get selectedTimeframe() {
      return this.appStore.selectedBudgetTimeframe;
  }
  
  get getClosingAmount() {
    return this.appStore.getClosingAmount;
  }
}
export default toNative(BudgetSelectionView);
</script>