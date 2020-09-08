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
  markRaw,
  watch,
} from "@vue/composition-api";
import HandlerDataService from "./HandlerDataService";
export default defineComponent({
  name: "template-form",
  setup(_, ctx: SetupContext) {
    const handlerDataService = inject(HandlerDataService.token);
    if (!handlerDataService)
      throw new Error("template form must used at EjsHandler");
    const configForm = ctx.root.$form.createForm(ctx.root, {
      name: "configForm",
    });
    const selected = computed(
      () => handlerDataService.selectWidget.value?.data
    );
    let initial: any = ref(null);
    watch(
      selected,
      (val) => {
        configForm.resetFields();
        initial.value = { ...val?.config };
        configForm.getFieldDecorator("keys", {
          initialValue: initial.value,
        });
      },
      { immediate: true }
    );
    const findVariableByKey = (key: string) =>
      selected.value?.variables.find((el) => el.name === key);
    const title = computed(() => selected.value?.name || "...");
    return {
      title,
      configForm,
      selected,
      initial,
      submit() {
        configForm.validateFields((_, val) => {
          for (let key in val.names) {
            if (!selected.value) return;
            selected.value.config[key] = val.names[key];
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
      getValueProp(key: string) {
        return findVariableByKey(key)?.formValueProp || "value";
      },
    };
  },
});
</script>

<template>
  <a-card :title="title+'-自定义组件配置'">
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
          v-decorator="[`names[${index}]`,{initialValue: initial[index],valuePropName:getValueProp(index)}]"
        ></component>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" block>更新组件模板</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>