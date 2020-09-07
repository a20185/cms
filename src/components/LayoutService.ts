import WidgetService from "./WidgetService";
import { ref, Ref, computed, ComputedRef } from "@vue/composition-api";

export enum PLATFORM {
  PC = "pc",
  Tab = "tab",
  Mob = "mob",
}

export default class LayoutService {
  list: Ref<WidgetService[]>;
  selected: WidgetService | null = null;
  wrapperWidth: ComputedRef<string>; // 部件宽度
  wrapperSpan: ComputedRef<number>; // 部件列宽
  colNum: ComputedRef<number>; // 部件列数
  wrapperBack: ComputedRef<string>; // 部件背景
  constructor(list: Ref<WidgetService[]>, platform: PLATFORM) {
    this.list = ref([]);
    this.list.value = list.value;
    this.wrapperWidth = computed(() =>
      platform === PLATFORM.PC
        ? "1032px"
        : platform === PLATFORM.Tab
        ? "816px"
        : "336px"
    );
    this.wrapperSpan = computed(() =>
      platform === PLATFORM.PC ? 42 : platform === PLATFORM.Tab ? 67 : 55
    );
    this.colNum = computed(() =>
      platform === PLATFORM.PC ? 24 : platform === PLATFORM.Tab ? 12 : 6
    );
    this.wrapperBack = computed(
      () => `repeating-linear-gradient(
    90deg,
    transparent,
    transparent ${this.wrapperSpan.value}px,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.2) ${this.wrapperSpan.value + 1}px
    )`
    );
  }
  handleListChange(e: any) {
    this.list = e;
  }
  handleSelect(item: WidgetService) {
    this.selected = item;
  }

  handleLayoutChange(service: LayoutService, e: any) {
    service.list.value = e;
  }
}
