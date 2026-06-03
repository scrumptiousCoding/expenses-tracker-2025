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
                        <h3>Under budget! (Coming soon)</h3>
                      </v-card-text>
                    </div>
                  </v-card>
                </div>
              </v-card>
            </v-col>
            <v-col cols="4">
              <info-card-with-button 
                :title="selectedTimeframe?.description"
                :secondaryText="getTimeframeDates"
                icon="mdi-pencil"
                @actionItem="showModal = true" />
              
              <apexchart
                type="pie"
                :options="options"
                :series="seriesData"
              />
            </v-col>
            <v-col cols="4">
              <v-card>
                <v-card-title class="sticky-note-header">
                  <v-icon size="x-small" v-tooltip:left="'The totals of each category, this is to show what you have already saved in the category'">mdi-information</v-icon>
                  Savings Details
                </v-card-title>
                <v-card-text class="sticky-note-body">
                  <v-data-table
                    density="compact"
                    :headers="headers"
                    item-value="type"
                    :items="getSavingsList" 
                    hide-default-footer
                  >
                    <template #[`item.amount`]="{ item }">
                      <td>
                        {{ $settingsStore.currencyFormatting(item.amount) }}
                      </td>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>

              <v-card class="mt-4">
                <v-card-title class="sticky-note-header">
                  <v-icon size="x-small" v-tooltip:left="'The totals of each category, this is to show what you have already spent in the category'">mdi-information</v-icon>
                  Spending Details
                </v-card-title>
                <v-card-text class="sticky-note-body">
                  <v-data-table
                    density="compact"
                    :headers="headersSpending"
                    item-value="type"
                    :items="getSpendingDetails" 
                    hide-default-footer
                  >
                    <template #[`item.amount`]="{ item }">
                      <td>
                        {{ $settingsStore.currencyFormatting(item.amount) }}
                      </td>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
      <new-budget-timeframe :key="showModal ? 'open' : 'closed'" :show-modal="showModal" @close-modal="showModal = false" :isNewTimeFrame="false" />
    </div>
    
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import { Component, Vue, toNative } from "vue-facing-decorator";
import { useBudgetStore } from "@/stores/budgetStore";
import InfoCardWithButton from "./SmallBits/InfoCardWithButton.vue";

@Component({
  components: {
    InfoCardWithButton
  }
})
class BudgetOverviewView extends Vue {
  showModal: boolean = false
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
    labels: ["Coming soon", "Coming Soon", "Savings"],
    dataLabels: {
      formatter(val: number, opts: { w: { globals: { labels: string[] } }, seriesIndex: number }) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(2)];
      },
    },
  };
  headers = [
    { title: "Description", value: "description" },
    { title: "Amount", value: "amount" },
    { title: "", key: "actions"}
  ]
  headersSpending = [
    { title: "Description", value: "description" },
    { title: "Amount", value: "amount" },
    { title: "Type", value: "type" },
    { title: "", key: "actions"}
  ]


  get appStore() {
      return useBudgetStore();
  }

  get selectedTimeframe() {
      return this.appStore.selectedBudgetTimeframe;
  }

  get getTimeframeDates(){
    return new Date(this.selectedTimeframe?.startDate || '').toLocaleDateString() + ' - ' + new Date(this.selectedTimeframe?.endDate || '').toLocaleDateString()
  }

  get getSavingsList() {
    const buildSavingsList = (items: any[]) =>
      items.map(item => ({
        description: item.description,
        amount: this.sumTransactions(item.transactions)
      }))
    
    return [
      ...buildSavingsList(this.selectedTimeframe?.savings ?? [])
    ]
  }

  get getSpendingDetails() {
    const buildSpendingList = (items: any[], type: string) =>
      items.map(item => ({
        description: item.description,
        amount: this.sumTransactions(item.transactions),
        type
      }))
    
    return [
      ...buildSpendingList(this.selectedTimeframe?.expenses ?? [], 'Expense'),
      ...buildSpendingList(this.selectedTimeframe?.bills ?? [], 'Bill')
    ]
  }

  private sumTransactions(transactions: any[] = []) : number {
    return transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  }

}
export default toNative(BudgetOverviewView);
</script>