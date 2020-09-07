import TemplateService, { Variable } from "@/templates/TemplateService";
import { Ref, ref, onMounted, watch } from "@vue/composition-api";

/**
 * attach outer style management fo template
 *
 * @export
 * @class WidgetService
 * @extends {TemplateService}
 */
export default class WidgetService extends TemplateService {
  style: Ref<string>;
  constructor(
    template: string,
    variables: Variable[],
    js: string,
    style: string = ""
  ) {
    super(template, variables, js);
    this.style = ref(style);
  }
}
