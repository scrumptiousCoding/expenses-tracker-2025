<template>
  <v-card class="mb-3">
    <div class="bookmark-right"></div>
    <div class="card-border">
      <v-card-text>
        <p class="info-card-title">
          {{ title }}
        </p>
        <h3>R {{ amount.toFixed(2) }}</h3>
      </v-card-text>
    </div>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
@Component
class InfoCard extends Vue {
  @Prop({ default: 0, required: true, type: Number }) amount!: number;
  @Prop({ required: true, type: String }) title!: string;
}
export default toNative(InfoCard);
</script>
<style></style>
