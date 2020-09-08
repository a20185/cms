<script lang="ts">
import TemplateDisplay from "./TemplateDisplay.vue";
import { defineComponent, inject } from "@vue/composition-api";
import HandlerDataService from "./HandlerDataService";
export default defineComponent({
  name: "TemplateList",
  components: { TemplateDisplay },
  setup() {
    const handlerData = inject(HandlerDataService.token);
    if (!handlerData) throw new Error("tamplate list must within EJSHandler");
    const list = handlerData.templates;
    return {
      list,
      handleDrag(key: string, e: DragEvent) {
        console.log(key, e);
        if (!e.dataTransfer) return;
        e.dataTransfer.setData("text/plain", key);
      },
    };
  },
});
</script>

<template>
  <div>
    <a-space>
      <a-card
        v-for="(template,key) of list"
        :key="key"
        style="display:inline-block;max-width: 200px;max-height:200px"
        :title="key"
        draggable="true"
        @dragstart="handleDrag(key,$event)"
      >
        <template-display :template="template"></template-display>
      </a-card>
    </a-space>
  </div>
</template>