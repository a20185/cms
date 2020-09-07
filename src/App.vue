
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import EJSHandler from "@/components/EJSHandler.vue";
export default defineComponent({
  name: "App",
  components: { EJSHandler },
});
</script>



<template>
  <div class="app-wrap">
    <EJSHandler />
  </div>
</template>

<style lang="less" scoped>
.app-wrap {
}
</style>
