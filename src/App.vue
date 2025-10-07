<template>
  <v-app>
    <sidebar />
    <v-main>
      <router-view />
    </v-main>
    <notifications position="bottom center" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import Sidebar from './components/Sidebar.vue';
import { useTheme } from 'vuetify'

@Component
class App extends Vue {
  theme = useTheme();

  mounted() {
    console.log(this.$settingsStore.selectedTheme)
    this.theme.change(this.$settingsStore.selectedTheme)
  }

}
export default toNative(App);

  //
</script>
