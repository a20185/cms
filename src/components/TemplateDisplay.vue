<script lang="ts">
import TemplateService from "@/templates/TemplateService";
import {
  defineComponent,
  onMounted,
  onUpdated,
  ref,
  watch,
  nextTick,
} from "@vue/composition-api";
import WidgetService from "./WidgetService";
export default defineComponent({
  name: "Widget",
  props: ["template"],
  setup(props: { template: TemplateService }, ctx) {
    const shadowDisplayer = ref<HTMLElement>(null as any);
    let shadow: ShadowRoot = null as any;
    onMounted(() => {
      shadow = shadowDisplayer.value.attachShadow({ mode: "closed" });
      props.template.renderNode(shadow);
    });
    watch(props.template.config, () => {
      props.template.renderNode(shadow);
    });
    return {
      shadowDisplayer,
    };
  },
});
</script>

<template>
  <div ref="shadowDisplayer"></div>
</template>