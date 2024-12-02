<template>
  <v-container>

    <v-row>
    <v-col cols="12">
      <navigation-comp />
    </v-col>
  </v-row>
  </v-container>

  
</template>
<script lang="ts">
import { Component, Setup, Vue, toNative } from "vue-facing-decorator";
import NavigationComp from "@/components/Navigation.vue";
import { useAppStore } from "@/stores/app";

@Component({
  components: {
    NavigationComp
  }
})
class IndexPage extends Vue {
  @Setup(() => {
    const appStore = useAppStore()
    return {useAppStore: appStore}
  })

  mounted(){
    console.log('Main page mounted');
    
  }
}
export default toNative(IndexPage);
</script>
<style></style>
