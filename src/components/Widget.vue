<script lang="ts">
import TemplateService from "@/templates/TemplateService";
import { defineComponent } from "@vue/composition-api";
import TemplateDisplay from "./TemplateDisplay.vue";

export default defineComponent({
  name: "Widget",
  components: { TemplateDisplay },
  props: ["template", "padding", "margin", "border"],
});
</script>

<template>
  <div class="widget-wrapper">
    <div class="mask">
      <a-button>编辑</a-button>
      <a-button type="danger">删除</a-button>
    </div>
    <div class="content" :style="{padding,margin,border}">
      <template-display :template="template" />
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
    z-index: 1;
  }
}
</style>