<template>
    <div class="pa-4">
        <v-card class="mb-3">
            <div class="card-border">
            <v-card-text class="d-flex flex-wrap">
                <div class="flex-1-0">
                    <v-file-input
                        accept=".json"
                        label="File upload"
                        placeholder="Upload your file"
                        density="compact"
                        variant="outlined"
                        hide-details="auto"
                        v-model="fileImport"
                    ></v-file-input>
                </div>
                <div class="mx-2 align-self-center">
                    <v-btn
                        block
                        variant="flat"
                        color="secondary" @click="readFile()">Import</v-btn>
                </div>
            </v-card-text>
            </div>
        </v-card>

        <v-card v-if="newInfo">
            <div class="card-border">
                <v-card-text>
                    <v-row>
                        <v-col class="text-right">
                            <v-btn @click="importThatData()"
                            variant="flat"
                            color="secondary">Looks good!</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </div>
        </v-card>
        
        <v-expansion-panels class="my-3" v-if="newInfo">
            <v-expansion-panel v-for="(timeframe, i) in newInfo.timeframes" :key="i" >
                <v-expansion-panel-title expand-icon="mdi-menu-down">
                    {{ timeframe.description }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-row>
                        <v-col>
                            <label>Start Date: </label> <span>{{ new Date(timeframe.startDate).toLocaleDateString() }}</span>
                        </v-col>
                        <v-col>
                            <label>End Date: </label> <span>{{ new Date(timeframe.endDate).toLocaleDateString() }}</span>
                        </v-col>
                        <v-col>
                            <label>Starting Balance: </label> <span>{{ settingsStore.currencyFormatting(timeframe.startingBalance) }}</span>
                        </v-col>
                        <v-col>
                            <label>Savings Starting Balance: </label> <span>{{ settingsStore.currencyFormatting(timeframe.savingsStartingBalance) }}</span>
                        </v-col>
                    </v-row>

                    <h2 class="dividing-header">Savings</h2>
                    <v-data-table
                        :loading="loadTableData"
                        density="compact"
                        :headers="headers"
                        item-value="type"
                        :items="timeframe?.savingsTransactions"
                        items-per-page="20"
                    >
                        <template #[`item.type`]="{ item }">
                        <td>
                            <v-chip
                            :color="getChipColor(item.type)"
                            size="small"
                            >
                            {{ item.type }}
                            </v-chip>
                        </td>
                        </template>
                    </v-data-table>
                    <h2 class="dividing-header">Transactions</h2>
                    <v-data-table
                        :loading="loadTableData"
                        density="compact"
                        :headers="headers"
                        item-value="type"
                        :items="timeframe.transaction"
                        items-per-page="20"
                    >
                        <template #[`item.type`]="{ item }">
                            <td>
                            <v-chip
                                :color="getChipColor(item.type)"
                                size="small"
                            >
                                {{ item.type }} 
                            </v-chip>
                            </td>
                        </template>
                    </v-data-table>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

    </div>
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import { useSettingsStore } from "@/stores/settingsStore";
import type { ITimeframe, ITransaction } from "@/stores/interfaces/ITimeframe";
import { Component, Vue, toNative } from "vue-facing-decorator";

@Component
class importData extends Vue {
    fileImport: any = null
    loadTableData: boolean = false;
    newInfo: any = []
    headers = [
        {
            title: "Date",
            key: "date",
            value: (item: ITransaction) => {
                return new Date(item.date).toLocaleDateString();
            },
        },
        { title: "Description", value: "description" },
        { title: "Type", value: "type" },
        {
            title: "Amount",
            key: "amount",
            value: (item: ITransaction) => {
                return this.settingsStore.currencyFormatting(item.amount);
            },
        },
        { title: "", key: "actions"}
    ];

    get appStore() {
        return useAppStore();
    } 
    get settingsStore() {
        return useSettingsStore()
    }

    readFile(){
        this.loadTableData = true
        if (this.fileImport) {
            const file = this.fileImport instanceof File ? this.fileImport : this.fileImport[0];
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    this.newInfo = json
                    this.$notify?.({ type: 'success', text: 'Upload succeeded. Please check the values.' });
                } catch (err) {
                    this.$notify?.({ type: 'error', text: 'Invalid JSON file' });
                }
                finally {
                    this.loadTableData = false
                }
            };
            reader.readAsText(file);
        } else {
            this.$notify?.({ type: 'error', text: 'No file selected' });
            this.loadTableData = false
        }
    }

    importThatData() {
        this.appStore.addNewTimeFrameFromImport(this.newInfo.timeframes)
        this.$notify?.({ type: 'success', text: 'Import succeeded' });
    }
    
    getChipColor(type: string) {
        switch (type) {
        case "Fixed Expenses":
            return "red";
        case "Other Expenses":
            return "blue";
        case "Income":
            return "green";
        case "Savings":
            return "orange";
        default:
            return "grey";
        }
    }
}
export default toNative(importData);
</script>
<style></style>
