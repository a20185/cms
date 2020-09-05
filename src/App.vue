<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import TemplateDisplay from "@/components/TemplateDisplay.vue";

import temps, { TemplateService } from "./templates";
export default defineComponent({
  name: "App",
  components: { TemplateDisplay },
  setup() {
    const testTemplate = new TemplateService(...temps.test);
    console.log(testTemplate);
    const testRef = ref<any>(null);
    return {
      testRef,
      testTemplate,
      change() {
        testTemplate.config.test = "black";
        console.log(testRef.value.dataset);
      },
    };
  },
});
</script>

<template>
  <div @click="change">
    <div ref="testRef" data-test="sdfsd"></div>
    <template-display :template="testTemplate"></template-display>
  </div>
</template>