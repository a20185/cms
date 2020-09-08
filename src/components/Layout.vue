<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  Ref,
  ref,
  watch,
  watchEffect,
} from "@vue/composition-api";
// @ts-ignore
import VueGridLayout from "vue-grid-layout";
import TemplateDisplay from "./TemplateDisplay.vue";
import HandlerDataService, { Widget } from "./HandlerDataService";

export default defineComponent({
  name: "Layout",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    TemplateDisplay,
  },
  props: ["platform"],
  setup(props: { platform: "pc" | "mobile" | "tablet" }) {
    const handlerDataService = inject(HandlerDataService.token);
    if (!handlerDataService)
      throw new Error("layout must used inside the EJSHandler");
    let layoutList = handlerDataService.handlerData[props.platform].map(
      (el) => el.layout
    );

    const widgetList = computed(() =>
      handlerDataService.handlerData[props.platform].map((el) => el.data)
    );
    const wrapperWidth = computed(() =>
      props.platform === "pc"
        ? "1032px"
        : props.platform === "tablet"
        ? "816px"
        : "336px"
    );
    const wrapperSpan = computed(() =>
      props.platform === "pc" ? 42 : props.platform === "tablet" ? 67 : 55
    );
    const colNum = computed(() =>
      props.platform === "pc" ? 24 : props.platform === "tablet" ? 12 : 6
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
      wrapperWidth,
      wrapperSpan,
      colNum,
      wrapperBack,
      layoutList,
      widgetList,
      layoutUpdate(e: any) {
        if (!handlerDataService) return;
        handlerDataService.refreshLayout(props.platform, e);
        layoutList = e;
      },
      select(e: any) {
        handlerDataService.select(props.platform, e);
      },
    };
  },
});
</script>

<template>
  <div class="layout-wrapper" :style="{width:wrapperWidth,background:wrapperBack}">
    <grid-layout
      :layout="layoutList"
      @layout-updated="layoutUpdate"
      :col-num="colNum"
      :row-height="40"
      :is-draggable="true"
      :is-resizable="true"
      :margin="[0, 0]"
    >
      <grid-item
        v-for="(item,index) in layoutList"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        <div @mousedown="select(index)" style="height:100%;">
          <template-display :template="widgetList[index]"></template-display>
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