<script lang="ts">
import { TemplateService } from "@/templates";
import {
  defineComponent,
  onMounted,
  onUpdated,
  watch,
} from "@vue/composition-api";
import WidgetService from "./WidgetService";
export default defineComponent({
  name: "Widget",
  props: ["template"],
  setup(props: { template: TemplateService }, ctx) {
    return {
      html: props.template.html,
    };
  },
});
</script>

<template>
  <div v-html="html"></div>
</template>