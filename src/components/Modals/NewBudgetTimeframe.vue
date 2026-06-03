<template>
  <v-dialog
    v-model="showModal"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card>
        <v-card-title class="space-between">
            <v-row>
                <v-col>
                    <v-btn @click="saveNewTimeframe()" color="primary">Save</v-btn>
                </v-col>
                <v-col class="text-right"><v-btn @click="attemptClosing">Close</v-btn></v-col>
            </v-row>
            
        </v-card-title>
        <v-card-text class="dot-grid-background">
            <v-row>
                <v-col class="pb-0">
                    <h4>Basic Information Setup</h4>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        label="Description"
                        density="compact"
                        v-model="newTimeFrame.description"
                        variant="outlined"
                        hide-details="auto"
                        :rules="[rules.required]"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        label="Primary Account Starting Balance"
                        density="compact"
                        variant="outlined"
                        hide-details="auto"
                        type="number"
                        v-model="newTimeFrame.startingBalance"
                        :rules="[rules.numbersOnly, rules.required]"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <date-selector :label="'Timeframe Start Date'" v-model:data="newTimeFrame.startDate" />
                </v-col>
                <v-col cols="6">
                    <date-selector :label="'Timeframe End Date'" v-model:data="newTimeFrame.endDate" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="11">

                    <v-row v-if="appStore.budgetTimeframes.length > 0">
                        <v-col cols="12">
                            <v-banner
                                icon="mdi-exclamation-thick"
                                color="primary"
                                :stacked="false"
                            >
                            <v-banner-text>
                                You can import some things from the previous buget to make some things easier.
                            </v-banner-text>

                            <template v-slot:actions>
                                <v-btn>Import From Previous (Coming soon)</v-btn>
                            </template>
                            </v-banner>
                        </v-col>
                    </v-row>

                    
                    <v-row>
                        <v-col>
                            <v-banner
                                color="primary"
                                :stacked="false"
                            >
                                <v-banner-text>
                                    <h4>Bills</h4>
                                    These are once off expenses for the time period. Or things that are unavoidable such as cell phone contracts and rent
                                </v-banner-text>

                                <template v-slot:actions>
                                    <v-btn @click="fillBills()">Fill with sample</v-btn>
                                </template>
                            </v-banner>
                        </v-col>
                    </v-row>

                    <budget-sections-setup :list="newTimeFrame.bills"/>

                    
                    <v-row>
                        <v-col class="pb-0">
                            <v-banner
                                color="primary"
                                :stacked="false"
                            >
                                <v-banner-text>
                                    <h4>Expenses</h4>
                            These are categories for recurring expenses such as groceries or transport costs. 
                                </v-banner-text>

                                <template v-slot:actions>
                                    <v-btn @click="fillExpenses()">Fill with sample</v-btn>
                                </template>
                            </v-banner>
                        </v-col>
                    </v-row>
                    <budget-sections-setup :list="newTimeFrame.expenses"/>


                    
                    <v-row>
                        <v-col class="pb-0">
                            <v-banner
                                color="primary"
                                :stacked="false"
                            >
                                <v-banner-text>
                                    <h4>Savings</h4>
                            If you have more than one savings account then this is the place to keep track of them. Otherwise just adding one is fine. Do note that this app assumes that all allocations to savings go into a different account and as such would be deducted from your account balance. 
                                </v-banner-text>

                                <template v-slot:actions>
                                    <v-btn @click="fillSavings()">Fill with sample</v-btn>
                                </template>
                            </v-banner>
                        </v-col>
                    </v-row>
                    <budget-sections-setup :list="newTimeFrame.savings"/>


                    
                </v-col>
                <v-col cols="1">
                    <v-card image="https://i.pinimg.com/736x/6c/83/bb/6c83bb5b04aa8fc03381745c64b29407.jpg"
                        height="100%"
                        variant="flat">
                    </v-card>
                </v-col>
            </v-row>
            
                    <v-row>
                        <v-col class="pb-0">
                            <h4>Goals</h4>                   
                        </v-col>
                    </v-row>
        </v-card-text>
    </v-card>
  </v-dialog>


  <v-dialog
    v-model="showConfirmationModal"
    width="500"
  >
    <v-card>
        <v-card-text>
            Unsaved changes will not be lost! Are you sure you want to leave?
        </v-card-text>
        <v-card-actions>
            <v-btn @click="closeModal()">Yes</v-btn>
            <v-btn @click="showConfirmationModal = false">No</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, toNative, Prop } from "vue-facing-decorator";
import { useAppStore } from "@/stores/app";
import DateSelector from "../SmallBits/DateSelector.vue";
import type { IBudget } from "@/stores/interfaces/IBudgetDefinitions";
import { useBudgetStore } from "@/stores/budgetStore.js";

@Component({
  components: {
    DateSelector
  }
})
class TimeFrameModal extends Vue {
  @Prop({ required: true, default: false }) showModal!: boolean;
  @Prop({ default: true, required: true, type: Boolean }) isNewTimeFrame!: boolean;
  
  rules = {
    required: (value: string) => !!value || "This field is required",
    numbersOnly: (value: any) => /^[0-9]+([\.][0-9]+)?$/.test(value) || "Only numerical values and a . are allowed"
  };

  description: string = ''
  currencySelected: string = ''
  showConfirmationModal: boolean = false
  newTimeFrame : IBudget = {
        description: '',
        startingBalance: 0,
        startDate: new Date(),
        endDate: new Date(),
        id: 0,
        backedUp: false,

        bills: [],
        expenses: [],
        savings: []
    }   
  emptyTimeFrame : IBudget = {
        description: '',
        startingBalance: 0,
        startDate: new Date(),
        endDate: new Date(),
        id: 0,
        backedUp: false,

        bills: [],
        expenses: [],
        savings: []
    }

  get appStore() {
    return useBudgetStore();
  }


  get selectedBudgetTimeframe() {
    return this.appStore.selectedBudgetTimeframe
  }

  mounted() {
    this.currencySelected = this.$settingsStore.selectedCountry.currencySymbol
  }

  created() {
    if (!this.isNewTimeFrame) {
        this.newTimeFrame = JSON.parse(JSON.stringify(this.selectedBudgetTimeframe))
    } else {
        this.newTimeFrame = JSON.parse(JSON.stringify(this.emptyTimeFrame))
    }
  }

  dummyInfoForBills(){
    this.newTimeFrame.bills.push()
  }

  normalizeBudget(budget: IBudget) {
    const normalizeDate = (value: string | Date) => 
        value ? new Date(value).getTime() : null;
    
    return {
        ...budget,
        startDate: normalizeDate(budget.startDate),
        endDate: normalizeDate(budget.endDate)
    }
  }

  attemptClosing() {
    if (this.isNewTimeFrame) {
        const timeframeNew = this.normalizeBudget(this.newTimeFrame)
        const empty = this.normalizeBudget(this.emptyTimeFrame)
        if (JSON.stringify(timeframeNew) !== JSON.stringify(empty)) {
            this.showConfirmationModal = true
        }
        else this.closeModal()
    } else {
        const original = this.normalizeBudget(this.appStore.selectedBudgetTimeframe!)
        const timeframeNew = this.normalizeBudget(this.newTimeFrame)
        if (JSON.stringify(timeframeNew) !== JSON.stringify(original)) {
            this.showConfirmationModal = true
        }
        else this.closeModal()
    }
  }

  closeModal() {
    this.showConfirmationModal = false
    this.$emit("closeModal");
  }

  saveNewTimeframe() {
    this.appStore.addNewTimeframe(this.newTimeFrame)
    this.closeModal();
  }

  fillBills() {
    const billsExample = [
        {
            description: 'Rent',
            amount: 1500.00,
            notes: '',
            transactions: []
        },
        {
            description: 'Phone Bill',
            amount: 200.00,
            notes: '',
            transactions: []
        },
        {
            description: 'Other Bills',
            amount: 500.00,
            notes: '',
            transactions: []
        }
    ]
    this.newTimeFrame.bills = billsExample
  }

  fillExpenses() {
    const expenseExample = [
        {
            description: 'Groceries',
            amount: 4000.00,
            notes: '',
            transactions: []
        },
        {
            description: 'Gas',
            amount: 1000.00,
            notes: '',
            transactions: []
        },
        {
            description: 'Personal spending',
            amount: 2000.00,
            notes: '',
            transactions: []
        }
    ]
    this.newTimeFrame.expenses = expenseExample
  }

  fillSavings() {
    const savingsExample = [
        {
            description: 'True Savings',
            amount: 1500.00,
            notes: '',
            startingAmount: 10000.00,
            transactions: []
        },
        {
            description: 'Big Buy Savings',
            amount: 500.00,
            notes: '',
            startingAmount: 5000.00,
            transactions: []
        }
    ]
    this.newTimeFrame.savings = savingsExample
  }
}
export default toNative(TimeFrameModal);
</script>

<style scoped>
.v-text-field{
    background-color: white;
}
</style>
