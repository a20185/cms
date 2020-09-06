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
} from '@vue/composition-api'
import { DragService, DragServiceProps } from './DragAndDropService'
export default defineComponent({
  name: 'Test',
  setup() {
    const dragProps = new DragServiceProps()
    dragProps.onDrop = (e) => {
      console.log(e)
    }
    const dragService = new DragService(dragProps)
    const dragParentRef = ref<HTMLElement | null>(null)
    const dropParentRef = ref<HTMLElement | null>(null)
    const handleChange = (
      val: [Ref<HTMLElement | null>, Ref<HTMLElement | null>]
    ) => {
      if (!val[0].value || !val[1].value) {
        return
      }
      dragService.dragRefList.value = [...(val[0].value.children as any)]
      dragService.dropRefList.value = [...(val[1].value.children as any)]
    }
    watch([dragParentRef, dropParentRef], handleChange)
    onMounted(() => {
      handleChange([dragParentRef, dropParentRef])
    })

    return {
      dragList: [1, 2, 3, 4, 5],
      dropList: [6, 7, 8, 9, 10],
      dragParentRef,
      dropParentRef,
      ...dragService,
    }
  },
})
</script>

<template>
  <div>
    <h1>当前拖拽 第「{{ currentDragIndex }}」个</h1>
    <h2>当前放置 第「{{ currentDropIndex }}」个</h2>
    <div ref="dragParentRef">
      <div v-for="(item, i) in dragList" :key="item">
        <a-card>
          <a-button>拖拽元素</a-button>
        </a-card>
      </div>
    </div>
    <div ref="dropParentRef">
      <div v-for="(item, i) in dropList" :key="item">
        <a-card>
          <a-button>放置区域</a-button>
        </a-card>
      </div>
    </div>
  </div>
</template>
