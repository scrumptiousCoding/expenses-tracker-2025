// Plugins
import { registerPlugins } from '@/plugins'
import VueApexCharts from "vue3-apexcharts";

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VueApexCharts);
registerPlugins(app)

app.mount('#app')
