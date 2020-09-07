import TemplateService, { Variable } from "@/templates/TemplateService";
import { Ref, ref, onMounted, watch, reactive } from "@vue/composition-api";

/**
 * attach outer style management fo template
 *
 * @export
 * @class WidgetService
 * @extends {TemplateService}
 */
export default class WidgetService extends TemplateService {
  padding: Ref<number>;
  margin: Ref<number>;
  x: number;
  y: number;
  w: number;
  h: number;
  i = ~~(Math.random() * 1000) + Date.now();
  constructor(template: string, variables: Variable[], js: string) {
    super(template, variables, js);
    this.padding = ref(0);
    this.margin = ref(0);
    this.x = 0;
    this.y = 0;
    this.w = 4;
    this.h = 4;
  }
}
