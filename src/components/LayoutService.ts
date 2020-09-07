import WidgetService from "./WidgetService";
import { ref, Ref } from "@vue/composition-api";

export default class LayoutService {
  list: Ref<WidgetService[]>;
  selected: WidgetService | null = null;
  constructor() {
    this.list = ref([]);
  }
  handleListChange(e: any) {
    this.list = e;
  }
  handleSelect(item: WidgetService) {
    this.selected = item;
  }
}
