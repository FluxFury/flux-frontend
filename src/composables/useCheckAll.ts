// src/composables/useCheckAll.ts
import { ref, computed, type Ref } from "vue"
import type { CheckboxValueType } from "element-plus"

/**
 * Реактивная «группа с чек-боксом “All”»
 * @param allOptions – массив примитивов (string | number | boolean)
 */
export function useCheckAll<T extends CheckboxValueType>(allOptions: T[]) {
  // ▸ явное указание типа убирает TS-ошибку 2322
  const checked: Ref<T[]> = ref([...allOptions]) as Ref<T[]>

  const checkAll        = ref(true)
  const isIndeterminate = computed(
    () => checked.value.length > 0 && checked.value.length < allOptions.length
  )

  /** клик по «All» */
  const toggleAll = (val: boolean | CheckboxValueType) => {
    const on = Boolean(val)
    checkAll.value  = on
    checked.value   = on ? [...allOptions] : []
  }

  /** изменение внутри группы */
  const updateFromGroup = (vals: T[]) => {
    checked.value  = vals
    checkAll.value = vals.length === allOptions.length
  }

  return { checked, checkAll, isIndeterminate, toggleAll, updateFromGroup }
}
