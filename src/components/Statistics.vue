<template>
    
  <v-card height="50" image="@/assets/Strawberries.jpg" class="mb-3"></v-card>
  <!-- <info-card title="Income" :amount="999999999.99" />
  <info-card title="Fixed Expenses" :amount="999999999.99" />
  <info-card title="Other Expenses" :amount="999999999.99" />
  <info-card title="Savings" :amount="999999999.99" /> -->
  <InfoCard />
  <InfoCard />
  <InfoCard />
  <InfoCard />
  </template>
  <script lang="ts">
//   import { useAppStore } from "@/stores/app";
  import { Component, Vue, toNative } from "vue-facing-decorator";
import InfoCard from "./InfoCard.vue";
  @Component({
  components: {
    InfoCard
  }
})
  class Statistics extends Vue {
  }
  export default toNative(Statistics);
  </script>
  <style></style>
  