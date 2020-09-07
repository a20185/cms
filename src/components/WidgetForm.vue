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
      changeStyle(e: any) {
        props.widget.style.value = e.target.value;
      },
    };
  },
});
</script>

<template>
  <div>
    <a-divider>自定义外部样式</a-divider>
    <a-textarea
      :autosize="{minRows: 4,maxRows: 10}"
      :value="widget.style.value"
      @change="changeStyle"
    ></a-textarea>
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