import { ComponentCustomProperties } from 'vue';
import type { SettingsStore } from '@/stores/settingsStore';
import type { Router } from 'vue-router';

// Add type for $notify
import type { Notify } from '@kyvg/vue3-notification';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $settingsStore: ReturnType<typeof import('@/stores/settingsStore').useSettingsStore>;
    $router: Router;
    $notify: typeof import('@kyvg/vue3-notification').notify;
  }
}
