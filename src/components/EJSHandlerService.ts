import WidgetService from "./WidgetService";
import { Ref, provide, ref, InjectionKey } from "@vue/composition-api";

import temps from "@/templates";
import TemplateService from "@/templates/TemplateService";

export interface HandlerData {
  pc: Ref<WidgetService[]>;
  tab: Ref<WidgetService[]>;
  mob: Ref<WidgetService[]>;
}
export default class EJSHandlerService {
  static token: InjectionKey<EJSHandlerService> = Symbol();
  static setup(data?: HandlerData) {
    const handlerService = new EJSHandlerService(data);
    provide(EJSHandlerService.token, handlerService);
    return handlerService;
  }

  handlerData: HandlerData;
  templateList: TemplateService[];
  selectedWidget: Ref<WidgetService | null>;
  constructor(handlerData?: HandlerData) {
    this.handlerData = { pc: ref([]), tab: ref([]), mob: ref([]) };
    if (handlerData) this.handlerData = handlerData;
    this.selectedWidget = ref(null);
    this.templateList = [];
    for (let key in temps) {
      this.templateList.push(new WidgetService(...temps[key]));
    }
  }
}
