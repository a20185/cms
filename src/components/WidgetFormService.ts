import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import WidgetService from "./WidgetService";
import { provide, inject, watch, Ref } from "@vue/composition-api";
import EJSHandlerService from "./EJSHandlerService";

/**
 * 模板配置表单服务
 *
 * @export
 * @class WidgetFormService
 */
export default class WidgetFormService {
  widgetIns: Ref<WidgetService | null>;
  root: any;
  configForm: WrappedFormUtils;

  changePadding = (e: any) => {
    if (!this.widgetIns.value) return;
    this.widgetIns.value.padding = e;
  };
  changeMargin = (e: any) => {
    if (!this.widgetIns.value) return;
    this.widgetIns.value.margin = e;
  };
  constructor(root: any) {
    this.widgetIns = (inject(EJSHandlerService.token) as any).selectedWidget;
    watch(this.widgetIns, console.log);
    this.root = root;
    this.configForm = root.$form.createForm(root, {
      name: "configForm",
    });
    this.configForm.getFieldDecorator("keys", {
      initialValue: this.widgetIns.value?.config || {},
      preserve: true,
    });
  }

  findVariableByKey(key: string) {
    return this.widgetIns.value?.variables.find((el) => el.name === key);
  }

  getLabel(key: string) {
    return this.findVariableByKey(key)?.formLabel || "未命名";
  }

  getFormComponent(key: string) {
    return this.findVariableByKey(key)?.formComponent || "a-input";
  }

  getFormProps(key: string) {
    return this.findVariableByKey(key)?.formComponentProps || {};
  }

  getInitialValue(key: string) {
    return this.widgetIns.value?.config[key] || undefined;
  }

  /**
   * 表单项配置逻辑提交
   *
   * @param {Event} e
   * @memberof TemplateFormService
   */
  submit(e: Event) {
    e.preventDefault();
    this.configForm.validateFields((_, val) => {
      for (let key in val.keys) {
        if (!this.widgetIns.value) return;
        console.log(this.widgetIns.value.html);
        this.widgetIns.value.config[key] = val.names[val.keys[key]];
      }
    });
  }
}
