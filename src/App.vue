<template>
  <v-app>
    <sidebar />
    <v-main>
      <router-view />
    </v-main>
    <notifications position="bottom center" />
  </v-app>
</template>

<script lang="ts" setup>
import Sidebar from './components/Sidebar.vue';

  //
</script>
