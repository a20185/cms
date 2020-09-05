import TemplateService from "@/templates/TemplateService";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";

export default class TemplateFormService {
  template: TemplateService;
  root: any;
  configForm: WrappedFormUtils;
  constructor(template: TemplateService, root: any) {
    this.template = template;
    this.root = root;
    this.configForm = root.$form.createForm(root, {
      name: "configForm",
    });
    this.configForm.getFieldDecorator("keys", {
      initialValue: this.template.config,
      preserve: true,
    });
  }

  findVariableByKey(key: string) {
    return this.template.variables.find((el) => el.name === key);
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
    return this.template.config[key] || undefined;
  }

  submit(e: Event) {
    e.preventDefault();
    this.configForm.validateFields((_, val) => {
      for (let key in val.keys) {
        this.template.config[key] = val.names[val.keys[key]];
      }
    });
  }
}
