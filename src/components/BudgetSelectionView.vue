<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="4">
                    <v-card>
                        <h3 class="mx-2">Overview</h3>
                        <budget-label :description="'Savings Balance'" :amount="13791.44" :tonal="true" />
                        <budget-label :description="'Account Balance'" :amount="13791.44" :tonal="true" />
                        <budget-label :description="'Income'" :amount="13791.44" :tonal="true" />
                        <!-- <budget-label 
                            v-for="(item, index) in budgetingTimelines.savingAccounts" :key="index" 
                            :description="item.description" :amount="item.budgetAmount" /> -->
                        <budget-label :description="'Bills'" :amount="13791.44" :tonal="true" />
                        <budget-label :description="'Insurance'" :amount="13791.44" />
                        <budget-label :description="'Car'" :amount="13791.44" />
                        <budget-label :description="'Others'" :amount="13791.44" />
                        <budget-label :description="'Other Spending'" :amount="13791.44" :tonal="true" />
                        <budget-label :description="'Food'" :amount="13791.44" />
                        <budget-label :description="'Petrol'" :amount="13791.44" />
                        <budget-label :description="'Spending'" :amount="13791.44" />
                        <budget-label :description="'Ending Account Balance'" :amount="13791.44" :tonal="true" />
                        <budget-label :description="'Ending Savings Balance'" :amount="13791.44" :tonal="true" />
                    </v-card>
                </v-col>
                <v-col cols="4">
                </v-col>
                <v-col cols="4">
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import BudgetLabel from "@/components/SmallBits/BudgetLabel.vue";
import { useBudgetStore } from "@/stores/budgetStore";

@Component({
  components: {
    BudgetLabel
  }
})
class BudgetSelectionView extends Vue {
  get budgetStore() {
    return useBudgetStore();
  }
}
export default toNative(BudgetSelectionView);
</script>