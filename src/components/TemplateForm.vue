<script lang="ts">
import {
  defineComponent,
  ref,
  SetupContext,
  toRef,
  unref,
  watchEffect,
} from "@vue/composition-api";
import TemplateFormService from "./TemplateFormService";
import TemplateService from "@/templates/TemplateService";
export default defineComponent({
  name: "TemplateForm",
  props: ["template"],
  setup(props: { template: TemplateService }, ctx: SetupContext) {
    const formService = new TemplateFormService(props.template, ctx.root);
    return {
      formService,
    };
  },
});
</script>

<template>
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
</template>