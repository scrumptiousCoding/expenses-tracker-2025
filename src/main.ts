// Plugins
import { registerPlugins } from '@/plugins'
import VueApexCharts from "vue3-apexcharts";
import Notifications from '@kyvg/vue3-notification'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//fonts!
import '@fontsource/rouge-script';
import '@fontsource/atkinson-hyperlegible';
import { useSettingsStore } from '@/stores/settingsStore';
import router from '@/router';

const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(VueApexCharts)
app.use(Notifications);
registerPlugins(app)

// Provide settingsStore, router, and notify globally
app.config.globalProperties.$settingsStore = useSettingsStore();
app.config.globalProperties.$router = router;
app.config.globalProperties.$notify = app.config.globalProperties.$notify || ((...args: any[]) => {/* fallback no-op */});

app.mount('#app')
