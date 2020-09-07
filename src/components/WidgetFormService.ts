import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import WidgetService from "./WidgetService";

/**
 * 模板配置表单服务
 *
 * @export
 * @class WidgetFormService
 */
export default class WidgetFormService {
  widget: WidgetService;
  root: any;
  configForm: WrappedFormUtils;
  constructor(widget: WidgetService, root: any) {
    this.widget = widget;
    this.root = root;
    this.configForm = root.$form.createForm(root, {
      name: "configForm",
    });
    this.configForm.getFieldDecorator("keys", {
      initialValue: this.widget.config,
      preserve: true,
    });
  }

  findVariableByKey(key: string) {
    return this.widget.variables.find((el) => el.name === key);
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
    return this.widget.config[key] || undefined;
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
        this.widget.config[key] = val.names[val.keys[key]];
      }
    });
  }
}
