<script lang="ts">
import {
  defineComponent,
  ref,
  SetupContext,
  toRef,
  unref,
  watchEffect,
} from "@vue/composition-api";
import WidgetFormService from "./WidgetFormService";
import WidgetService from "./WidgetService";
export default defineComponent({
  name: "WidgetForm",
  props: ["widget"],
  setup(props: { widget: WidgetService }, ctx: SetupContext) {
    return {
      formService: new WidgetFormService(props.widget, ctx.root),
      changePadding(e: any) {
        props.widget.padding.value = e;
      },
      changeMargin(e: any) {
        props.widget.margin.value = e;
      },
    };
  },
});
</script>

<template>
  <div>
    <a-divider>自定义外部样式</a-divider>
    <a-form>
      <a-form-item label="内边距">
        <a-input-number :value="widget.padding.value" @change="changePadding"></a-input-number>
      </a-form-item>
      <a-form-item label="外边距">
        <a-input-number :value="widget.margin.value" @change="changeMargin"></a-input-number>
      </a-form-item>
    </a-form>
    <a-divider>自定义组件配置</a-divider>
    <a-form :form="formService.configForm" @submit.prevent="formService.submit">
      <a-form-item
        v-for="(k,index) in formService.configForm.getFieldValue('keys')"
        :label="formService.getLabel(index)"
        :key="k"
        :required="false"
      >
        <component
          :is="formService.getFormComponent(index)"
          v-bind="formService.getFormProps(index)"
          v-decorator="[`names[${k}]`,{initialValue:formService.getInitialValue(index) }]"
        ></component>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" block>更新组件模板</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>