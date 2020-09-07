<script lang="ts">
import TemplateService from "@/templates/TemplateService";
import { defineComponent, watch } from "@vue/composition-api";
import TemplateDisplay from "./TemplateDisplay.vue";
import WidgetService from "./WidgetService";

export default defineComponent({
  name: "WidgetDisplay",
  components: { TemplateDisplay },
  props: ["widget"],
});
</script>

<template>
  <div class="widget-wrapper">
    <!-- <div class="mask">
      <a-button>编辑</a-button>
      <a-button type="danger">删除</a-button>
    </div>-->
    <div
      class="content"
      :style="{padding: widget.padding.value+'px',margin: widget.margin.value+'px'}"
    >
      <template-display :template="widget" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.widget-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: transparent;
    z-index: 2;
    opacity: 0;
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    transition: backgroud-color 0.3s, opacity 0.3s;
    &:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  .content {
    height: 100%;
    z-index: 1;
  }
}
</style>