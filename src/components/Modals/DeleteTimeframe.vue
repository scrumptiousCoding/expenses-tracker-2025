<template>
  <v-card>
    <v-card-title>
      <v-icon size="small">mdi-alert-box</v-icon>
      Warning!
    </v-card-title>
    <v-card-text>
      You are about to delete a timeframe, this action is not reversible. 
        <span class="font-weight-bold">Do you want to delete anyway?</span>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="closeModal" color="error" variant="outlined">Cancel</v-btn>
      <v-btn @click="deleteTimeframe()" color="primary" variant="flat">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
@Component
class DeleteTimeframeModal extends Vue {
  closeModal() {
    this.$emit("closeModal");
  }
  deleteTimeframe() {
    this.$emit("deleteTimeframe");
  }
}
export default toNative(DeleteTimeframeModal);
</script>
