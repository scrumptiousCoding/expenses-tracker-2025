<template>
    <div class="d-flex px-2" :class="tonal ? 'tonalBackground' : '' ">
        <div class="flex-1-0">
            {{ description }}
        </div>
        <div class="flex-1-0 text-right">
            {{ $settingsStore.currencyFormatting(amount) }}
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, toNative, Prop } from "vue-facing-decorator";
@Component
class BudgetLabel extends Vue {
  @Prop({ required: true }) description!: string;
  @Prop({ required: true }) amount!: number;
  @Prop({ required: false, default: false }) tonal: boolean | undefined;

}
export default toNative(BudgetLabel);
</script>