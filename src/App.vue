<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from "@vue/composition-api";
import WidgetDisplay from "@/components/WidgetDisplay.vue";
import WidgetForm from "@/components/WidgetForm.vue";
import LayoutContent from "@/components/LayoutContent.vue";

import temps from "./templates";
import WidgetService from "@/components/WidgetService";

import Test from "@/components/Test.vue";
export default defineComponent({
  name: "App",
  components: { WidgetDisplay, WidgetForm, Test, LayoutContent },
  setup() {
    const widget = new WidgetService(
      ...temps.test,
      "background-color:black;color:white;"
    );
    watch(widget.style, (val) => {
      console.log(val);
    });
    return {
      widget,
    };
  },
});
</script>

<template>
  <a-space>
    <layout-content></layout-content>
    <a-card>
      <widget-display :widget="widget"></widget-display>
    </a-card>
    <a-card>
      <widget-form :widget="widget"></widget-form>
    </a-card>
    <test />
  </a-space>
</template>
