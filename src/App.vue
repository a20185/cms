<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import WidgetService from "./components/WidgetService";
import WidgetDisplay from "@/components/WidgetDisplay.vue";
import WidgetVariableForm from "@/components/WidgetVariableForm.vue";
export default defineComponent({
  name: "App",
  components: { WidgetDisplay, WidgetVariableForm },
  setup() {
    return {
      widget: new WidgetService({
        html: `
      <style>
      .test{
        color:&&-red&&颜色-&&
      }
      </style>
      <div class="test">&&-test&&文本内容-&&</div>
      `,
        script: `
      document.querySelector('.test').style.background='&&-red&&修改的背景颜色-&&';
      document.querySelector('.test').style.color='&&-white&&修改的字体颜色-&&';
      `,
      }),
    };
  },
});
</script>

<template>
  <div>
    <widget-display :widget="widget"></widget-display>
    <widget-variable-form :widget="widget"></widget-variable-form>
  </div>
</template>