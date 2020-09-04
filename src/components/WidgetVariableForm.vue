<script lang="ts">
import { defineComponent, SetupContext } from "@vue/composition-api";
import WidgetService from "./WidgetService";
export default defineComponent({
  name: "WidgetVariableForm",
  props: ["widget"],
  setup(props: { widget: WidgetService }, ctx) {
    const htmlFormModel = props.widget.htmlVariables;
    const scriptFormModel = props.widget.scriptVariables;
    const htmlForm = ctx.root.$form.createForm(ctx.root, { name: "htmlForm" });
    htmlForm.getFieldDecorator("keys", {
      initialValue: htmlFormModel,
      preserve: true,
    });
    const scriptForm = ctx.root.$form.createForm(ctx.root, {
      name: "scriptForm",
    });
    scriptForm.getFieldDecorator("keys", {
      initialValue: scriptFormModel,
      preserve: true,
    });
    return {
      htmlFormModel,
      scriptFormModel,
      htmlForm,
      scriptForm,
      submitHtml() {
        htmlForm.validateFields((errs, value) => {
          if (errs) {
            ctx.root.$message.warning("请注意变量格式");
          } else {
            props.widget.htmlVariables = [
              ...value.keys.map((el: string) => value.names[el]),
            ];
          }
          props.widget.submit();
        });
      },
      submitScript() {
        scriptForm.validateFields((errs, value) => {
          if (errs) {
            ctx.root.$message.warning("请注意变量格式");
          } else {
            props.widget.scriptVariables = [
              ...value.keys.map((el: string) => value.names[el]),
            ];
          }
          props.widget.submit();
        });
      },
      validator(_: any, value: string, cb: (val?: string) => void) {
        if (value.split(WidgetService.variableToken).length !== 2) {
          cb("请按照 内容 && 注解 的方式进行变量更改");
        } else {
          cb();
        }
      },
    };
  },
});
</script>

<template>
  <div>
    <a-divider>模板和样式变量</a-divider>
    <a-form :form="htmlForm" @submit.prevent="submitHtml">
      <a-form-item
        v-for="(k,index) in htmlForm.getFieldValue('keys')"
        :key="k"
        :label="'第'+(index+1)+'个'"
        :required="false"
      >
        <a-input
          v-decorator="[`names[${k}]`,{initialValue:htmlFormModel[index] ,rules:[{validator}]}]"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" block>更新组件模板</a-button>
      </a-form-item>
    </a-form>

    <a-divider>脚本变量</a-divider>
    <a-form :form="scriptForm" @submit.prevent="submitScript">
      <a-form-item
        v-for="(k,index) in scriptForm.getFieldValue('keys')"
        :key="k"
        :label="'第'+(index+1)+'个'"
        :required="false"
      >
        <a-input
          v-decorator="[`names[${k}]`,{initialValue:scriptFormModel[index],rules:[{validator}] }]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-button html-type="submit" type="primary" block>更新脚本</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>