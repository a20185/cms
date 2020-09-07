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
import LayoutService from "./LayoutService";
import WidgetService from "./WidgetService";
import WidgetDisplay from "./WidgetDisplay.vue";

export enum PLATFORM {
  PC = "pc",
  Tab = "tab",
  Mob = "mob",
}

export default defineComponent({
  name: "Layout",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    WidgetDisplay,
  },
  props: ["list", "platform"],
  setup(props: { list: Ref<WidgetService[]>; platform: PLATFORM }) {
    console.log(props.list);
    const wrapperStyle = computed(() =>
      props.platform === PLATFORM.PC
        ? "1032px"
        : props.platform === PLATFORM.Tab
        ? "816px"
        : "336px"
    );
    const wrapperSpan = computed(() =>
      props.platform === PLATFORM.PC
        ? 42
        : props.platform === PLATFORM.Tab
        ? 67
        : 55
    );
    const colNum = computed(() =>
      props.platform === PLATFORM.PC
        ? 24
        : props.platform === PLATFORM.Tab
        ? 12
        : 6
    );
    const wrapperBack = computed(
      () => `repeating-linear-gradient(
    90deg,
    transparent,
    transparent ${wrapperSpan.value}px,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.2) ${wrapperSpan.value + 1}px
  )`
    );
    return {
      handleLayoutChange(e: any) {
        props.list.value = e;
      },
      wrapperStyle,
      wrapperBack,
      colNum,
    };
  },
});
</script>

<template>
  <div class="layout-wrapper" :style="{width:wrapperStyle,background:wrapperBack}">
    <grid-layout
      :layout="list.value"
      @layout-updated="handleLayoutChange"
      :col-num="colNum"
      :row-height="40"
      :is-draggable="true"
      :is-resizable="true"
      :margin="[0, 0]"
    >
      <grid-item
        v-for="(item,index) in list.value"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="index"
      >
        <widget-display :widget="list.value[index]"></widget-display>
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