import templates from "@/templates";
import TemplateService from "@/templates/TemplateService";
import { InjectionKey, provide, Ref, ref } from "@vue/composition-api";

export interface Layout {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
}

export interface Widget {
  data: TemplateService;
  layout: Layout;
}

export interface HandlerData {
  pc: Widget[];
  tablet: Widget[];
  mobile: Widget[];
}

export default class HandlerDataService {
  static token: InjectionKey<HandlerDataService> = Symbol();
  static getData() {
    const handlerDataService = new HandlerDataService();
    provide(HandlerDataService.token, handlerDataService);
    return handlerDataService;
  }
  templates: { [key: string]: TemplateService };
  handlerData: HandlerData;
  selectWidget: Ref<Widget | null>;

  constructor() {
    this.templates = {};
    this.handlerData = { pc: [], mobile: [], tablet: [] };
    this.selectWidget = ref(null);
    for (let key in templates) {
      this.templates[key] = new TemplateService(key, ...templates[key]);
    }
  }
  refreshLayout = (plateForm: "pc" | "mobile" | "tablet", layout: Layout[]) => {
    for (let key in layout) {
      this.handlerData[plateForm][key].layout = layout[key];
    }
  };

  add = (plateForm: "pc" | "mobile" | "tablet", name: string) => {
    this.handlerData[plateForm].push({
      data: new TemplateService(name, ...templates[name]),
      layout: {
        x: 0,
        y: 0,
        w: 4,
        h: 4,
        i: (~~(Math.random() * 1000 + Date.now())).toString(),
      },
    });
  };

  remove = (plateForm: "pc" | "mobile" | "tablet", key: number) => {
    this.handlerData[plateForm].splice(key, 1);
  };

  select = (plateForm: "pc" | "mobile" | "tablet", key: number) => {
    this.selectWidget.value = this.handlerData[plateForm][key];
  };
}
