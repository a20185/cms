import WidgetService from "./WidgetService";
import {
  ref,
  Ref,
  computed,
  ComputedRef,
  inject,
  nextTick,
  isRef,
} from "@vue/composition-api";
import EJSHandlerService from "./EJSHandlerService";

export enum PLATFORM {
  PC = "pc",
  Tab = "tab",
  Mob = "mob",
}

export default class LayoutService {
  list: Ref<WidgetService[]>;
  wrapperWidth: ComputedRef<string>; // 部件宽度
  wrapperSpan: ComputedRef<number>; // 部件列宽
  colNum: ComputedRef<number>; // 部件列数
  wrapperBack: ComputedRef<string>; // 部件背景
  handlerService: EJSHandlerService | undefined;

  handleSelect = (idx: any) => {
    if (this.handlerService)
      this.handlerService.selectedWidget.value = this.list.value[idx];
  };
  handleLayoutChange = (e: WidgetService[]) => {
    for (let key in e) {
      this.list.value[key as any].x = e[key].x;
      this.list.value[key as any].y = e[key].y;
      this.list.value[key as any].w = e[key].w;
      this.list.value[key as any].h = e[key].h;
    }
  };
  constructor(list: Ref<WidgetService[]>, platform: PLATFORM) {
    this.handlerService = inject(EJSHandlerService.token);
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
}
