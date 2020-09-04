<script lang="ts">
import { defineComponent, onMounted, onUpdated } from "@vue/composition-api";
import WidgetService from "./WidgetService";
export default defineComponent({
  name: "Widget",
  props: ["widget"],
  setup(props: { widget: WidgetService }, ctx) {
    onMounted(() => {
      try {
        eval(props.widget.script.value);
      } catch (err) {
        ctx.root.$message.error("脚本添加错误，请稍后再试");
      }
    });
    return {
      html: props.widget.html,
    };
  },
});
</script>

<template>
  <div v-html="html"></div>
</template>