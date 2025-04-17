<template>
    <v-card>
      <v-card-title>
        <div class="ribbon-corner"></div>
        <div class="ribbon-corner-secondary"></div>
        <h1>Settings</h1>
      </v-card-title>
      <v-card-text>
        <v-card class="sticky-note">
          <v-card-title class="sticky-note-title">Settings</v-card-title>
        <v-card-text class="pt-2">
            <v-select
                label="Country"
                density="compact"
                v-model="selectedCountry"
                :items="settingsStore.countryLocaleList"
                item-title="countryName"
                :return-object="true"
            ></v-select>
            
            <!-- @update:modelValue="selectCountry" -->
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
    selectedCountry = null;
    
get appStore() {
  return useAppStore()
}
  get settingsStore() {
    return useSettingsStore()
  }

mounted(){
    this.fetchLocaleInformation()
}

selectCountry(country: ICountryLocale) {
    this.settingsStore.setSelectedCountry(country);
  }
fetchLocaleInformation() {
    this.settingsStore.getLocaleList()
  }
closeModal() {
  this.$emit("closeModal");
}
}
export default toNative(TimeFrameModal);
</script>