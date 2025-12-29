<template>
    <div>
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
                  <v-col cols="12">
                    <v-card>
                      <v-card-title class="sticky-note-header d-flex ">
                        <span class=" me-auto">Food</span>
                        <v-btn variant="text">
                          <v-icon>mdi-window-minimize</v-icon>
                        </v-btn>
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
                  <v-col cols="12">
                    <v-card>
                      <v-card-title class="sticky-note-header">
                        Petrol
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
                  <v-col cols="12">
                    <v-card>
                      <v-card-title class="sticky-note-header">
                        Treat Yo Self
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
  
  headers = [
    { title: "name", value: "name" },
    { title: "calories", value: "calories" },
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
          }
        ]

  get budgetStore() {
    return useBudgetStore();
  }
}
export default toNative(BudgetSelectionView);
</script>