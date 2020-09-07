<script lang="ts">
import {
  computed,
  defineComponent,
  Ref,
  ref,
  watch,
  watchEffect,
} from "@vue/composition-api";
// @ts-ignore
import VueGridLayout from "vue-grid-layout";
import LayoutService, { PLATFORM } from "./LayoutService";
import WidgetService from "./WidgetService";
import WidgetDisplay from "./WidgetDisplay.vue";

export default defineComponent({
  name: "Layout",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    WidgetDisplay,
  },
  props: ["list", "platform"],
  setup(props: { list: Ref<WidgetService[]>; platform: PLATFORM }) {
    return {
      layoutService: new LayoutService(props.list, props.platform),
    };
  },
});
</script>

<template>
  <div
    class="layout-wrapper"
    :style="{width:layoutService.wrapperWidth.value,background:layoutService.wrapperBack.value}"
  >
    <grid-layout
      :layout="layoutService.list.value"
      @layout-updated="layoutService.handleLayoutChange($event)"
      :col-num="layoutService.colNum.value"
      :row-height="40"
      :is-draggable="true"
      :is-resizable="true"
      :margin="[0, 0]"
    >
      <grid-item
        v-for="(item,index) in layoutService.list.value"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        <div @mousedown="layoutService.handleSelect(index)" style="height:100%;">
          <widget-display :widget="layoutService.list.value[index]"></widget-display>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<style lang="less" scoped>
.layout-wrapper {
  min-height: 400px;
  position: relative;
}
</style>