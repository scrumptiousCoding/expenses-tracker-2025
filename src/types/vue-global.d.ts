import { ComponentCustomProperties } from 'vue';
import type { SettingsStore } from '@/stores/settingsStore';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $settingsStore: ReturnType<typeof import('@/stores/settingsStore').useSettingsStore>;
  }
}
