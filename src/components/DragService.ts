import {
  Ref,
  ref,
  onMounted,
  onBeforeUnmount,
  onBeforeUpdate,
  nextTick,
} from "@vue/composition-api";

export type DragEl = HTMLElement | undefined;
export type DropEl = HTMLElement | undefined;
export type DragCb = (e: DragEvent) => void;

/**
 * 配置拖拽参数类
 * @description
 * @date 2020-09-06
 * @export
 * @class DragServiceProps
 */
export class DragServiceProps {
  onDrag?: DragCb;
  onStart?: DragCb;
  onEnd?: DragCb;
  onEnter?: DragCb;
  onLeave?: DragCb;
  onOver?: DragCb;
  onExit?: () => void;
  onDrop?: DragCb;
}

/**
 * @description
 * drag service
 * @date 2020-09-06
 * @export
 * @class DragService
 */
export default class DragService {
  private static currentDragRef: DragEl;
  private static currentDropRef: DropEl;

  dragRefList: Ref<DragEl[]>;
  dropRefList: Ref<DropEl[]>;
  props: DragServiceProps;
  currentDrag: Ref<DragEl>;
  currentDragIndex: Ref<number>;
  currentDrop: Ref<DropEl>;
  currentDropIndex: Ref<number>;
  constructor(props: DragServiceProps) {
    this.props = props;
    this.dragRefList = ref([]);
    this.dropRefList = ref([]);
    this.currentDrag = ref(undefined);
    this.currentDrop = ref(undefined);
    this.currentDragIndex = ref(0);
    this.currentDropIndex = ref(0);

    onMounted(async () => {
      await nextTick();
      if (this.dragRefList.value.length <= 0) {
        throw new Error(
          'please bind the dragRefList, by ref="el=>dragListRef[i]=el"'
        );
      }
      if (this.dropRefList.value.length <= 0) {
        throw new Error(
          'please bind the dropRefList, by ref="el=>dragListRef[i]=el"'
        );
      }
      for (let key in this.dragRefList.value) {
        const dragRef = this.dragRefList.value[key];
        if (!dragRef) return;
        console.log(dragRef);
        dragRef.draggable = true;
        dragRef.addEventListener("drag", this.drag.bind(this));
        dragRef.addEventListener("dragstart", (e: DragEvent) =>
          this.start.bind(this)(e, parseInt(key))
        );
        dragRef.addEventListener("dragend", this.end.bind(this));
        dragRef.addEventListener("dragexit", this.exit.bind(this));
      }
      for (let key in this.dropRefList.value) {
        const dropRef = this.dropRefList.value[key];
        if (!dropRef) return;
        dropRef.addEventListener("dragenter", this.enter.bind(this));
        dropRef.addEventListener("dragleave", this.leave.bind(this));
        dropRef.addEventListener("dragover", this.over.bind(this));
        dropRef.addEventListener("drop", (e: DragEvent) =>
          this.drop.bind(this)(e, parseInt(key))
        );
      }
    });

    onBeforeUnmount(() => {
      for (let key in this.dragRefList.value) {
        const dragRef = this.dragRefList.value[key];
        if (!dragRef) return;
        dragRef.removeEventListener("drag", this.drag.bind(this));
        dragRef.removeEventListener("dragstart", (e: DragEvent) =>
          this.start.bind(this)(e, parseInt(key))
        );
        dragRef.removeEventListener("dragend", this.end.bind(this));
        dragRef.removeEventListener("dragexit", this.exit.bind(this));
      }
      for (let key in this.dropRefList.value) {
        const dropRef = this.dropRefList.value[key];
        if (!dropRef) return;
        dropRef.removeEventListener("dragenter", this.enter.bind(this));
        dropRef.removeEventListener("dragleave", this.leave.bind(this));
        dropRef.removeEventListener("dragover", this.over.bind(this));
        dropRef.removeEventListener("drop", (e: DragEvent) =>
          this.drop.bind(this)(e, parseInt(key))
        );
      }
    });
  }

  drag(e: DragEvent) {
    if (this.props.onDrag) this.props.onDrag(e);
  }
  start(e: DragEvent, idx: number) {
    this.currentDragIndex.value = idx;
    this.currentDrag.value = this.dragRefList.value[idx];
    DragService.currentDragRef = this.currentDrag.value;
    if (this.props.onStart) this.props.onStart(e);
  }
  end(e: DragEvent) {
    DragService.currentDragRef = undefined;
    if (this.props.onEnd) this.props.onEnd(e);
  }
  enter(e: DragEvent) {
    if (this.props.onEnter) this.props.onEnter(e);
  }
  exit() {
    DragService.currentDragRef = undefined;
    if (this.props.onExit) this.props.onExit();
  }
  leave(e: DragEvent) {
    if (this.props.onLeave) this.props.onLeave(e);
  }
  over(e: DragEvent) {
    e.preventDefault();
    if (this.props.onOver) this.props.onOver(e);
  }
  drop(e: DragEvent, idx: number) {
    this.currentDropIndex.value = idx;
    this.currentDrop.value = this.dropRefList.value[idx];
    DragService.currentDropRef = this.currentDrop.value;
    if (this.props.onDrop) this.props.onDrop(e);
  }
}
