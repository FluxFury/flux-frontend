//TODO: добвить типы к аргументам функции
export default function handleCheckAllChange(checkAll: boolean, items, checkedItems, isIndeterminate) {
	checkedItems.value = checkAll ? items : []
	isIndeterminate.value = false
}
