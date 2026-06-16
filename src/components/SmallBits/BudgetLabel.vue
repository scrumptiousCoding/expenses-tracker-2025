<template>
    <v-row :class="tonal ? 'tonalBackground' : '' ">
        <v-col cols="6" class="py-0">
            {{ description }}
        </v-col>
        <v-col cols="3" class="py-0 text-right">
            {{ $settingsStore.currencyFormatting(amount) }}
        </v-col>
        <v-col cols="3" class="py-0 text-right">
            <div v-if="spent !== undefined">
                {{ $settingsStore.currencyFormatting(spent) }}
            </div>
        </v-col>
    </v-row>
</template>
<script lang="ts">
import { Component, Vue, toNative, Prop } from "vue-facing-decorator";
@Component
class BudgetLabel extends Vue {
  @Prop({ required: true }) description!: string;
  @Prop({ required: true }) amount!: number;
  @Prop({ required: false }) spent: number | undefined;
  @Prop({ required: false, default: false }) tonal: boolean | undefined;

}
export default toNative(BudgetLabel);
</script>