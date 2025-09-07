<template>
    <div class="pa-4">
        <v-card class="mb-3">
            <div class="card-border">
            <v-card-text class="d-flex flex-wrap">
                <div class="flex-1-0">
                    <v-file-upload density="compact"></v-file-upload>
                </div>
                <div class="mx-2 align-self-center">
                    <v-btn
                        block
                        variant="flat"
                        color="secondary" @click="importData()">Export</v-btn>
                </div>
            </v-card-text>
            </div>
        </v-card>

        <v-card>
            Show what you are gonna see
        </v-card>
    </div>
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import type { ITimeframe } from "@/stores/interfaces/ITimeframe";
import { Component, Vue, toNative } from "vue-facing-decorator";

@Component
class importData extends Vue {
    get appStore() {
        return useAppStore();
    } 

    importData() {
        this.$notify?.({ type: 'success', text: 'Import succeeded' });
    }
}
export default toNative(importData);
</script>
<style></style>
