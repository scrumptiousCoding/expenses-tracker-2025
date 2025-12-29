<template>
  <v-card class="mb-3">
    <div class="bookmark-right" />
    <div class="card-border">
      <v-card-text>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="auto"
            class="pr-0"
          >
            <v-btn
              variant="text"
              class="pa-0"
              density="compact"
              :icon="icon"
              @click="actionItem()"
            />
          </v-col>
          <v-col>
            <p class="info-card-title">
              {{ title }}
            </p>
            <h3>
              {{ secondaryText }}
            </h3>
          </v-col>
        </v-row>
      </v-card-text>
    </div>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
@Component
class InfoCardWithButton extends Vue {
  @Prop({ required: true, type: String }) secondaryText!: string;
  @Prop({ required: true, type: String }) title!: string;
  @Prop({ required: true, type: String }) icon!: string;

  actionItem() {
    this.$emit('actionItem')
  }
}
export default toNative(InfoCardWithButton);
</script>
<style></style>
