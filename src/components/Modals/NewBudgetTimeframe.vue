<template>
  <v-dialog
    v-model="showModal"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card>
        <v-card-title>
            <v-btn @click="closeModal">Close</v-btn>
        </v-card-title>
        <v-card-text class="dot-grid-background">
            <v-row>
                <v-col cols="11">
                    <v-row class="px-0">
                        <v-col cols="4">
                            <v-text-field
                                label="Budget"
                                density="compact"
                                v-model="budget"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                label="Budget"
                                density="compact"
                                v-model="budget"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                label="Budget"
                                density="compact"
                                v-model="budget"
                                variant="outlined"
                                hide-details="auto"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="1">
                    <v-card image="https://i.pinimg.com/736x/6c/83/bb/6c83bb5b04aa8fc03381745c64b29407.jpg"
                        height="100%"
                        variant="flat">
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script lang="ts">
import { Component, Vue, toNative, Prop } from "vue-facing-decorator";

@Component
class TimeFrameModal extends Vue {
  @Prop({ required: true, default: false }) showModal!: boolean;

  budget = ''

  closeModal() {
    this.$emit("closeModal");
  }
}
export default toNative(TimeFrameModal);
</script>

<style scoped>
.v-text-field{
    background-color: white;
}
</style>
