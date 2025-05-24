<template>
  <v-card>
    <v-card-title>
      <div class="ribbon-corner" />
      <div class="ribbon-corner-secondary" />
      <h1>Settings</h1>
    </v-card-title>
    <v-card-text>
      <v-card class="sticky-note">
        <v-card-title class="sticky-note-title">
          Settings
        </v-card-title>
        <v-card-text class="pt-2">
          <v-select
            v-model="selectedCountry"
            label="Country"
            variant="outlined"
            density="compact"
            :items="settingsStore.countryLocaleList"
            item-title="countryName"
            :return-object="true"
            @update:model-value="selectCountry"
          />
        </v-card-text>
      </v-card>
      
      <v-card class="sticky-note">
        <v-card-title class="sticky-note-title">
          Categories
        </v-card-title>
        <v-card-text class="pt-2">
          <v-text-field
            label="New Expendature Type"
            v-model="newExpendature"
            variant="outlined"
            append-inner-icon="mdi-plus"
            @click:append-inner="addNewTransactionType"
          ></v-text-field>
          <v-chip v-for="(item, index) in appStore.transactionTypes" :key="index" class="mr-1" size="small"
            append-icon="mdi-close" @click="removeTransactionType(index)">{{ item }}</v-chip>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { useAppStore } from "@/stores/app";
import { useSettingsStore } from "@/stores/settingsStore";
import type { ICountryLocale } from "@/stores/interfaces/ICountryLocale";

@Component
class TimeFrameModal extends Vue {
  selectedCountry: ICountryLocale | null = null;
  newExpendature: string = '';

  get appStore() {
    return useAppStore();
  }
  get settingsStore() {
    return useSettingsStore();
  }

  mounted() {
    this.fetchLocaleInformation();
    this.selectedCountry = this.settingsStore.selectedCountry
  }

  selectCountry(country: ICountryLocale) {
    this.settingsStore.setSelectedCountry(country);
  }
  fetchLocaleInformation() {
    this.settingsStore.getLocaleList();
  }
  addNewTransactionType() {
    this.appStore.addNewTransactionType(this.newExpendature)
    this.newExpendature = ''
  }
  removeTransactionType(index: number) {
    this.appStore.removeTransactionType(index)
  }
  closeModal() {
    this.$emit("closeModal");
  }
}
export default toNative(TimeFrameModal);
</script>
