import TemplateService from "@/templates/TemplateService";
import WidgetService from "./WidgetService";

/**
 * 布局模式
 *
 * @export
 * @enum {number}
 */
export enum LAYOUTMODE {
  grid = "grid",
  flex = "flex",
  fixed = "fixed",
}

// export interface Widget

export default class LayoutContentService {
  widgetList: WidgetService[];
  mode = LAYOUTMODE.grid;
  length: number;
  constructor(widgetList: WidgetService[], mode?: LAYOUTMODE, length = 3) {
    this.widgetList = widgetList;
    this.length = length;
    if (mode) this.mode = mode;
  }
}
