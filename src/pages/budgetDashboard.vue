<template>
    <div class="dot-grid-background">
        <v-card image="https://i.pinimg.com/1200x/89/26/7f/89267f0a43554f842ef8d1a6e9295bc7.jpg" 
            height="250" 
            style="border-radius: 0px; opacity: 0.7;" 
            variant="flat">
            <v-container height="100%" class="d-flex align-end">
                <v-card class="flex-grow-1">
                    <div class="card-border">
                        <v-card-text class="d-flex flex-wrap">
                            <div class="flex-1-0">
                                <v-select
                                    item-title="description"
                                    item-value="id"
                                    variant="outlined"
                                    hide-details="auto"
                                    density="compact"
                                    label="Select a timeframe"
                                    return-object
                                    single-line
                                />
                            </div>
                            <div class="align-self-center ml-3">
                                <v-menu location="bottom">
                                    <template #activator="{ props }">
                                    <v-btn
                                        variant="text"
                                        density="comfortable"
                                        icon="mdi-cog"
                                        v-bind="props"
                                    />
                                    </template>

                                    <v-list>
                                        <v-list-item @click="showModal = true">
                                            <v-list-item-title>New time frame</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item @click="">
                                            <v-list-item-title>De-select time frame</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </div>
                        </v-card-text>
                    </div>
                </v-card>
            </v-container>
        </v-card>
        <v-container>
            <v-row>
                <v-col cols="3">
                    <v-btn block @click="tab = 'overview'" :disabled="tab === 'overview'" color="primary">Overview</v-btn>
                </v-col>
                <v-col cols="3">
                    <v-btn block @click="tab = 'budgeting'" :disabled="tab === 'budgeting'" color="primary">Budgeting</v-btn>
                </v-col>
                <v-col cols="3">
                    <v-btn block @click="tab = 'savings'" :disabled="tab === 'savings'" color="primary">Savings</v-btn>
                </v-col>
                <v-col cols="3">
                    <v-btn block @click="tab = 'goals'" color="primary">Goals</v-btn>
                </v-col>
            </v-row>
            <v-row v-if="tab === 'overview'">
                <v-col>
                    <budget-overview />
                </v-col>
            </v-row>
            <v-row v-if="tab === 'budgeting'">
                <v-col>
                    <budget-selection />
                </v-col>
            </v-row>
            <v-row v-if="tab === 'savings'">
                <v-col>
                    <budget-savings />
                </v-col>
            </v-row>
            <v-row v-if="tab === 'goals'">
                <v-col>
                    <budget-goals-and-settings />
                </v-col>
            </v-row>
        </v-container>

        <new-budget-timeframe :show-modal="showModal" @close-modal="showModal = false" />
    </div>
</template>
<script lang="ts">
import BudgetSelection from "@/components/BudgetSelectionView.vue";
import BudgetOverview from "@/components/BudgetOverviewView.vue";
import BudgetGoalsAndSettings from "@/components/BudgetGoalsAndSettingsView.vue";
import BudgetSavings from "@/components/BudgetSavingsView.vue";
import { Component, Vue, toNative } from "vue-facing-decorator";

@Component({
  components: {
    BudgetSelection,
    BudgetOverview,
    BudgetGoalsAndSettings,
    BudgetSavings
  }
})
class budgetDashboard extends Vue {
    showModal: boolean = false
    tab: string = 'overview'
}
export default toNative(budgetDashboard);
</script>
