<template>
  <v-card>
    <v-card-title class="pb-0">
      <div class="ribbon-corner" />
      <div class="ribbon-corner-secondary" />
      <h1>Settings</h1>
    </v-card-title>
    <v-card-text class="pt-0 px-2">
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
            :items="$settingsStore.countryLocaleList"
            item-title="countryName"
            :return-object="true"
            @update:model-value="selectCountry"
          />
          <v-select
            v-model="selectedTheme"
            label="Theme"
            variant="outlined"
            density="compact"
            :items="$settingsStore.themes"
            item-title="themeName"
            :return-object="true"
            @update:model-value="selectTheme"
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
            density="compact"
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
  import { useTheme } from 'vuetify'
import type { ICountryLocale } from "@/stores/interfaces/ICountryLocale";

@Component
class SettingsModal extends Vue {
  selectedCountry: ICountryLocale | null = null;
  selectedTheme: any = null;
  newExpendature: string = '';
  theme = useTheme();

  get appStore() {
    return useAppStore();
  }

  mounted() {
    this.fetchLocaleInformation();
    this.selectedCountry = this.$settingsStore.selectedCountry
  }

  selectCountry(country: ICountryLocale) {
    this.$settingsStore.setSelectedCountry(country);
  }
  selectTheme(theme: any) {
    this.theme.change(theme)
    this.$settingsStore.setSelectedTheme(theme);
  }
  fetchLocaleInformation() {
    this.$settingsStore.getLocaleList();
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
export default toNative(SettingsModal);
</script>
