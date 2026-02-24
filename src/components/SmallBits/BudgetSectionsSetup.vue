<template>
  <v-row class="px-0 py-0 flex-nowrap" v-for="(item, index) in list" :key="index">
      <v-col 
        class="flex-grow-1 flex-shrink-0">
          <v-text-field
              label="Description"
              density="compact"
              variant="outlined"
              hide-details="auto"
              v-model="item.description"
          ></v-text-field>
      </v-col>
      <v-col class="flex-grow-1 flex-shrink-0">
          <v-text-field
              label="Budgeted Amount"
              density="compact"
              variant="outlined"
              hide-details="auto"
              type="number"
              v-model="item.amount"
          ></v-text-field>
      </v-col>
      <v-col class="flex-grow-0 flex-shrink-0 pl-0">
          <v-btn variant="flat" icon="mdi-trash-can" class="" @click="removeAtIndex(index)" >
          </v-btn>
      </v-col>
  </v-row>


  <v-row>
      <v-col class="pt-0">
          <v-btn block color="primary" @click="addNewItem()">
              Add
          </v-btn>
      </v-col>
  </v-row>
</template>
<script lang="ts">
import type { IBudgetCategories } from "@/stores/interfaces/IBudgetDefinitions";
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
@Component
class InfoCard extends Vue {
  @Prop({ required: true, type: Array }) list!: Array<IBudgetCategories>;

    addNewItem() {
      this.list.push({description: '', amount: 0, transactions: []})
    }
    removeAtIndex(num: number) {
      this.list.splice(num, 1);
    }
}
export default toNative(InfoCard);
</script>
<style></style>
