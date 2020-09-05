<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import TemplateDisplay from "@/components/TemplateDisplay.vue";
import TemplateForm from "@/components/TemplateForm.vue";

import temps from "./templates";
import TemplateService from "@/templates/TemplateService";
export default defineComponent({
  name: "App",
  components: { TemplateDisplay, TemplateForm },
  setup() {
    const testTemplate = new TemplateService(...temps.test);
    return {
      testTemplate,
    };
  },
});
</script>

<template>
  <a-space>
    <a-card>
      <template-display :template="testTemplate"></template-display>
    </a-card>
    <a-card>
      <template-form :template="testTemplate"></template-form>
    </a-card>
  </a-space>
</template>