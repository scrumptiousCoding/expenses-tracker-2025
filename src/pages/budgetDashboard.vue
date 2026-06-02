<template>
    <div class="dot-grid-background">
        <v-card image="https://i.pinimg.com/1200x/89/26/7f/89267f0a43554f842ef8d1a6e9295bc7.jpg" 
            height="250" 
            style="border-radius: 0px;" 
            variant="flat">
            <v-container height="100%" class="d-flex align-end">
                <v-card class="flex-grow-1">
                    <div class="card-border dot-grid-background">
                        <v-card-text class="d-flex flex-wrap">
                            <div class="flex-1-0">
                                <v-select
                                    v-model="appStore.selectedBudgetTimeframe"
                                    :items="timeFrameOptions"
                                    item-title="description"
                                    item-value="id"
                                    variant="outlined"
                                    hide-details="auto"
                                    density="compact"
                                    label="Select a timeframe"
                                    return-object
                                    bg-color="white"
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
                                        <v-list-item @click="deselectTimeframe()">
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
        <v-container v-if="appStore.selectedBudgetTimeframe != null">
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

        <new-budget-timeframe :key="showModal ? 'open' : 'closed'" :show-modal="showModal" @close-modal="showModal = false" :isNewTimeFrame="true" />
    </div>
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
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
    
    get appStore() {
        return useAppStore();
    }

    get timeFrameOptions() {
        return this.appStore.budgetTimeframes;
    }
    
    deselectTimeframe() {
        this.appStore.clearBudgetTimeframe();
    }
}
export default toNative(budgetDashboard);
</script>
