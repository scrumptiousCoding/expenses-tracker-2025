<template>
  <v-card
    height="50"
    image="@/assets/pumpkinTheme/pumpkinBack.jpg"
    class="mb-3"
  />
  <info-card
    title="Income"
    :amount="getIncome"
  />
  <info-card
    title="Fixed Expenses"
    :amount="getFixedExpenses"
  />
  <info-card
    title="Other Expenses"
    :amount="getOtherExpenses"
  />
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import { Component, Vue, toNative } from "vue-facing-decorator";
import InfoCard from "./InfoCard.vue";
@Component({
  components: {
    InfoCard,
  },
})
class Statistics extends Vue {
  get appStore() {
    return useAppStore();
  }
  get getIncome() {
    return this.appStore.getTotalIncome;
  }
  get getFixedExpenses() {
    return this.appStore.getTotalFixedExpenses;
  }
  get getOtherExpenses() {
    return this.appStore.getTotalOtherExpenses;
  }
}
export default toNative(Statistics);
</script>
<style></style>
