<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  Ref,
  ref,
  toRef,
  toRefs,
  unref,
  watch,
  watchEffect,
} from "@vue/composition-api";
import DragService, { DragServiceProps } from "./DragService";
import DragParentMapping from "./DragParentMapping";
export default defineComponent({
  name: "Test",
  setup() {
    const dragProps = new DragServiceProps();
    dragProps.onDrop = (e) => {
      console.log(e);
    };
    const dragService = new DragService(dragProps);
    return {
      dragList: [1, 2, 3, 4, 5],
      dropList: [6, 7, 8, 9, 10],
      ...DragParentMapping(dragService.dragRefList, dragService.dropRefList),
      ...dragService,
    };
  },
});
</script>

<template>
  <div>
    <h1>当前拖拽 第「{{ currentDragIndex }}」个</h1>
    <h2>当前放置 第「{{ currentDropIndex }}」个</h2>
    <div ref="dragParentRef">
      <div v-for="(item) in dragList" :key="item">
        <a-card>
          <a-button>拖拽元素</a-button>
        </a-card>
      </div>
    </div>
    <div ref="dropParentRef">
      <div v-for="(item) in dropList" :key="item">
        <a-card>
          <a-button>放置区域</a-button>
        </a-card>
      </div>
    </div>
  </div>
</template>
