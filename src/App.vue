<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import TemplateDisplay from "@/components/TemplateDisplay.vue";
import TemplateForm from "@/components/TemplateForm.vue";
import Widget from "@/components/Widget.vue";

import temps from "./templates";
import TemplateService from "@/templates/TemplateService";

import Test from "@/components/Test.vue";
export default defineComponent({
  name: "App",
  components: { TemplateDisplay, TemplateForm, Test, Widget },
  setup() {
    return {
      testTemplate: new TemplateService(...temps.test),
    };
  },
});
</script>

<template>
  <a-space>
    <widget :template="testTemplate" padding="20px" margin="20px" border="2px solid black" />
    <a-card>
      <template-display :template="testTemplate"></template-display>
    </a-card>
    <a-card>
      <template-form :template="testTemplate"></template-form>
    </a-card>
    <test />
  </a-space>
</template>
