<script lang="ts">
import {
  defineComponent,
  ref,
  SetupContext,
  toRef,
  unref,
  watchEffect,
} from "@vue/composition-api";
import TemplateService from "@/templates/TemplateService";
export default defineComponent({
  name: "TemplateForm",
  props: ["template"],
  setup(props: { template: TemplateService }, ctx: SetupContext) {
    const { config, variables } = props.template;
    const configForm = ctx.root.$form.createForm(ctx.root, {
      name: "configForm",
    });
    configForm.getFieldDecorator("keys", {
      initialValue: config,
      preserve: true,
    });
    const findVariableByKey = (key: string) => {
      return variables.find((el) => el.name === key);
    };
    const getLabel = (key: string) =>
      findVariableByKey(key)?.formLabel || "未命名";
    const getFormComponent = (key: string) =>
      findVariableByKey(key)?.formComponent || "a-input";
    const getFormProps = (key: string) =>
      findVariableByKey(key)?.formComponentProps || {};
    const getInitialValue = (key: string) => config[key] || undefined;
    const submit = (e: Event) => {
      e.preventDefault();
      configForm.validateFields((_, val) => {
        for (let key in val.keys) {
          config[key] = val.names[val.keys[key]];
        }
      });
    };
    return {
      config,
      variables,
      configForm,
      findVariableByKey,
      getLabel,
      getFormComponent,
      getFormProps,
      getInitialValue,
      submit,
    };
  },
});
</script>

<template>
  <a-form :form="configForm" @submit.prevent="submit">
    <a-form-item
      v-for="(k,index) in configForm.getFieldValue('keys')"
      :label="getLabel(index)"
      :key="k"
      :required="false"
    >
      <component
        :is="getFormComponent(index)"
        v-bind="getFormProps(index)"
        v-decorator="[`names[${k}]`,{initialValue:getInitialValue(index) }]"
      ></component>
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit" type="primary" block>更新组件模板</a-button>
    </a-form-item>
  </a-form>
</template>