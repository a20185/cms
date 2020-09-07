import { Ref, ref, watch, onMounted } from "@vue/composition-api";
import { DragEl, DropEl } from "./DragService";
/**
 * 绕开 ref 函数式指令
 * composition-api 不支持
 *
 * @export
 * @param {Ref<HTMLElement[]>} dragRefList
 * @param {Ref<HTMLElement[]>} dropRefList
 * @returns
 */
export default function (
  dragRefList: Ref<DragEl[]>,
  dropRefList: Ref<DropEl[]>
) {
  const dragParentRef = ref<HTMLElement | null>(null);
  const dropParentRef = ref<HTMLElement | null>(null);
  const handleChange = (
    val: [Ref<HTMLElement | null>, Ref<HTMLElement | null>]
  ) => {
    if (!val[0].value || !val[1].value) {
      return;
    }
    dragRefList.value = [...(val[0].value.children as any)];
    dropRefList.value = [...(val[1].value.children as any)];
  };
  watch([dragParentRef, dropParentRef], handleChange);
  onMounted(() => {
    handleChange([dragParentRef, dropParentRef]);
  });
  return { dragParentRef, dropParentRef };
}
