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
import WidgetService from "@/components/WidgetService";
import Layout from "@/components/Layout.vue";
import temps from "@/templates";
import EJSHandlerService, { HandlerData } from "./EJSHandlerService";
export default defineComponent({
  name: "App",
  components: { WidgetDisplay, WidgetForm, Layout },
  props: ["data"],
  setup(props: { data?: HandlerData }) {
    const handlerService = EJSHandlerService.setup(props.data);
    handlerService.handlerData = {
      pc: ref([new WidgetService(...temps.test)]) as any,
      tab: ref([
        new WidgetService(...temps.test),
        new WidgetService(...temps.test),
        new WidgetService(...temps.test),
        new WidgetService(...temps.test),
        new WidgetService(...temps.test),
      ]) as any,
      mob: ref([new WidgetService(...temps.test)]) as any,
    };
    watch(handlerService.selectedWidget, console.log);
    return handlerService;
  },
});
</script>

<template>
  <div class="ejs-handler-wrap">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="桌面端" style="overflow:auto;">
        <layout :list="handlerData.pc" platform="pc"></layout>
      </a-tab-pane>
      <a-tab-pane key="2" tab="平板端">
        <layout :list="handlerData.tab" platform="tab"></layout>
      </a-tab-pane>
      <a-tab-pane key="3" tab="移动端">
        <layout :list="handlerData.mob" platform="mob"></layout>
      </a-tab-pane>
    </a-tabs>
    <a-space>
      <a-card>
        <widget-form v-if="selectedWidget" :widget="selectedWidget"></widget-form>
        <div v-else>请选择组件</div>
      </a-card>
    </a-space>
  </div>
</template>

<style lang="less" scoped>
.ejs-handler-wrap {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
</style>