<template>
  <v-card class="mb-3">
    <div class="bookmark-right"></div>
    <div class="card-border">
      <v-card-text>
        <p class="info-card-title">
          <!-- {{ props.title }} -->
          False title
        </p>
        <h3>
          <!-- R {{ props.amount }} -->
          R 000.00
        </h3>
      </v-card-text>
    </div>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
@Component
class InfoCard extends Vue {}
export default toNative(InfoCard);
</script>
<style></style>
