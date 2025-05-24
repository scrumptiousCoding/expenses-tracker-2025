// Plugins
import { registerPlugins } from '@/plugins'
import VueApexCharts from "vue3-apexcharts";

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(VueApexCharts)
registerPlugins(app)

app.mount('#app')
