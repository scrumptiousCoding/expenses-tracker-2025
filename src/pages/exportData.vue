<template>
    <div class="pa-4">
        <v-card>
            <v-card-text>
                - list with checkboxes of timeframes that need to be exported.
                - keeping record of when the last backup was made and what was added after the backup was made
            </v-card-text>
        </v-card>
        
        <v-card>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="appStore.timeframes"
                    items-per-page="10"
                    show-select
                ></v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import type { ITimeframe } from "@/stores/interfaces/ITimeframe";
import { Component, Vue, toNative } from "vue-facing-decorator";

@Component
class exportData extends Vue {
    
    headers= [
        {
            title: "Description",
            key: "description",
            value: "description"
        },
        {
            title: "Description",
            value: "startDate"
        },
        { title: "Start Date", value: (item: ITimeframe) => {
                return new Date(item.startDate).toLocaleDateString();
            } 
        },
        { title: "End Date", value: (item: ITimeframe) => {
                return new Date(item.endDate).toLocaleDateString();
            } 
        }
    ]
    
       
    get appStore() {
        return useAppStore();
    } 
}
export default toNative(exportData);
</script>
<style></style>
