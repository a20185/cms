<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from "@vue/composition-api";
import Layout from "@/components/Layout.vue";
import temps from "@/templates";
import HandlerDataService from "./HandlerDataService";
import TemplateForm from "./TemplateForm.vue";
import TemplateList from "./TemplateList.vue";
export default defineComponent({
  name: "App",
  components: { TemplateForm, Layout, TemplateList },
  setup() {
    const handlerDataService = HandlerDataService.getData();
    handlerDataService.add("pc", "test");
    return {
      handlerData: handlerDataService.handlerData,
      selectedWidget: handlerDataService.selectWidget,
    };
  },
});
</script>

<template>
  <div style="padding:1em;">
    <div class="ejs-handler-wrap">
      <a-tabs default-active-key="1" style="width:100%;">
        <a-tab-pane key="1" tab="桌面端" style="overflow: auto;">
          <layout platform="pc"></layout>
        </a-tab-pane>
        <a-tab-pane key="2" tab="平板端" style="overflow: auto;">
          <layout platform="tablet"></layout>
        </a-tab-pane>
        <a-tab-pane key="3" tab="移动端" style="overflow: auto;">
          <layout platform="mobile"></layout>
        </a-tab-pane>
      </a-tabs>
      <a-space>
        <a-card>
          <template-form v-if="selectedWidget"></template-form>
          <div v-else>请选择组件</div>
        </a-card>
      </a-space>
    </div>
    <a-card title="备选组件" style="margin-top:1em;">
      <template-list></template-list>
    </a-card>
  </div>
</template>

<style lang="less" scoped>
.ejs-handler-wrap {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
</style>