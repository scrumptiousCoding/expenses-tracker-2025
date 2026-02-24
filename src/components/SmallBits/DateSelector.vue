<template>
    <div>
      <v-menu v-model="showDateModal" location="bottom start" offset="6">
        <template v-slot:activator="{ props }">
          <v-text-field
            v-bind="props"
            :label="label"
            density="compact"
            v-model="displayDate"
            variant="outlined"
            hide-details="auto"
            readonly
          >
            <template v-slot:append-inner>
              <v-btn @click.stop="openMenu" variant="plain" icon="mdi-calendar-month-outline" class="ma-n2" size="small" rounded="0"></v-btn>
            </template>
          </v-text-field>
        </template>

        <v-card>
          <v-date-picker
            v-model="dateSelected" width="100%"
            color="primary" show-adjacent-months
          />
        </v-card>
      </v-menu>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative, Prop, Watch } from "vue-facing-decorator";

@Component({
  emits: ['update:data']
})
class DateTimeSelector extends Vue {
  @Prop({ required: false, default: 'Select Date'}) label: string = '';
  @Prop({ required: true, type: Date }) data!: Date;

  showDateModal: boolean = false
  dateSelected: Date = new Date()

  created() {
    this.dateSelected = this.data
  }
  
  get displayDate(): string {
    if (!this.data) return ''
    try {
      const d = new Date(this.data)
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    } catch {
      return this.data.toISOString()
    }
  }

  openMenu() {
    this.showDateModal = true
  }

  clickMe() {
    this.showDateModal = false
  }

  @Watch('dateSelected')
  onDateSelected(newValue: Date) {
    this.$emit('update:data', newValue)
  }
  
}
export default toNative(DateTimeSelector);
</script>

<style scoped>
.v-text-field{
    background-color: white;
}
</style>
