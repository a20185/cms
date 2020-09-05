<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import TemplateDisplay from "@/components/TemplateDisplay.vue";

import temps from "./templates";
import TemplateService from "./templates/TemplateService";
export default defineComponent({
  name: "App",
  components: { TemplateDisplay },
  setup() {
    const testTemplate = new TemplateService(...temps.test);
    return {
      testTemplate,
      change() {
        testTemplate.config.test = "black";
      },
    };
  },
});
</script>

<template>
  <div @click="change">
    <template-display :template="testTemplate"></template-display>
  </div>
</template>