<template>
    <div class="pa-4">
        <v-card class="mb-3">
            <div class="card-border">
            <v-card-text class="d-flex flex-wrap">
                <div class="flex-1-0">
                    <v-text-field
                        v-model="customFileName"
                        density="compact"
                        variant="outlined"
                        label="File name"
                        hide-details="auto"
                        class="flex-1-1-100"
                        clearable
                    />
                </div>
                <div class="mx-2 align-self-center">
                <v-btn
                    block
                    variant="flat"
                    color="secondary" @click="exportData()">Export</v-btn>
                </div>
            </v-card-text>
            </div>
        </v-card>

        <v-card>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="appStore.timeframes"
                hide-default-footer
                show-select
            >
                <template #[`item.backedUp`]="{ item }">
                <td>
                    <v-chip
                    :color="item.backedUp? 'primary' : 'error'"
                    size="small"
                    >
                    {{ item.backedUp ? 'Yes' : 'No' }}
                    </v-chip>
                </td>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import type { ITimeframe } from "@/stores/interfaces/ITimeframe";
import { Component, Vue, toNative } from "vue-facing-decorator";

@Component
class exportData extends Vue {
    selected: number[] = []
    customFileName = ''
    headers= [
        {
            title: "Description",
            key: "description",
            value: "description"
        },
        {
            title: "Previously Backed Up",
            key: "backedUp",
            value: "backedUp"
        },
        {   
            title: "Start Date",
            key: "startDate",
            value: (item: ITimeframe) => {
                return new Date(item.startDate).toLocaleDateString();
            },
        },
        { 
            title: "End Date", 
            key: "endDate",
            value: (item: ITimeframe) => {
                return new Date(item.endDate).toLocaleDateString();
            } 
        }
    ]
    
       
    get appStore() {
        return useAppStore();
    } 

    get timeframes() {
        return this.appStore.timeframes;
    }

    exportData() {
        if (!this.selected.length) {
            this.$notify?.({ type: 'warn', text: 'No timeframes selected.' });
            return;
        }
        let fileName = 'ExpensesExport'
        if (this.customFileName !== '' && this.customFileName && this.customFileName !== undefined) fileName = this.customFileName
        const json = {
            version: '0.1',
            timeframes: this.timeframes.filter((tf: ITimeframe) => this.selected.includes(tf.id))
        };

        //json to string and string written to file
        const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.appStore.markItemsAsBackedUp(this.selected);
        this.$notify?.({ type: 'success', text: 'Export succeeded. Check your downloads' });
    }
}
export default toNative(exportData);
</script>
<style></style>
