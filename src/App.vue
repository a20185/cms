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
  <div>
    <template-display :template="testTemplate"></template-display>
    <template-form :template="testTemplate"></template-form>
  </div>
</template>