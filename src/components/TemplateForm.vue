<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  ref,
  SetupContext,
  toRef,
  unref,
  watchEffect,
} from "@vue/composition-api";
import HandlerDataService from "./HandlerDataService";
export default defineComponent({
  name: "template-form",
  setup(_, ctx: SetupContext) {
    const handlerDataService = inject(HandlerDataService.token);
    if (!handlerDataService)
      throw new Error("template form must used at EjsHandler");
    const selected = computed(
      () => handlerDataService.selectWidget.value?.data
    );
    const configForm = ctx.root.$form.createForm(ctx.root, {
      name: "configForm",
    });
    configForm.getFieldDecorator("keys", {
      initialValue: selected.value?.config || {},
    });
    const findVariableByKey = (key: string) =>
      selected.value?.variables.find((el) => el.name === key);
    return {
      configForm,
      submit() {
        configForm.validateFields((_, val) => {
          for (let key in val.keys) {
            if (!selected.value) return;
            selected.value.config[key] = val.names[val.keys[key]];
          }
        });
      },
      getLabel(key: string) {
        return findVariableByKey(key)?.formLabel || "未命名";
      },
      getFormComponent(key: string) {
        return findVariableByKey(key)?.formComponent || "a-input";
      },
      getFormProps(key: string) {
        return findVariableByKey(key)?.formComponentProps || {};
      },
      getInitialValue(key: string) {
        return selected.value?.config[key] || undefined;
      },
    };
  },
});
</script>

<template>
  <a-card title="自定义组件配置">
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
  </a-card>
</template>