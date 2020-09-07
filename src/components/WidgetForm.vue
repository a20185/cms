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
  setup(_, ctx: SetupContext) {
    return {
      form: new WidgetFormService(ctx.root),
    };
  },
});
</script>

<template>
  <div>
    <div>
      <a-divider>自定义外部样式</a-divider>
      <a-form>
        {{form.widgetIns.value.padding}}
        <a-form-item label="内边距">
          <a-input-number :value="form.widgetIns.value.padding" @change="form.changePadding"></a-input-number>
        </a-form-item>
        <a-form-item label="外边距">
          <a-input-number :value="form.widgetIns.value.margin" @change="form.changeMargin"></a-input-number>
        </a-form-item>
      </a-form>
      <a-divider>自定义组件配置</a-divider>
      <a-form :form="form.configForm" @submit.prevent="form.submit">
        <a-form-item
          v-for="(k,index) in form.configForm.getFieldValue('keys')"
          :label="form.getLabel(index)"
          :key="k"
          :required="false"
        >
          <component
            :is="form.getFormComponent(index)"
            v-bind="form.getFormProps(index)"
            v-decorator="[`names[${k}]`,{initialValue:form.getInitialValue(index) }]"
          ></component>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary" block>更新组件模板</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>