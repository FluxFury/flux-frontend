export const handleCheckAllChange = (checkAll, items, checkedItems, isIndeterminate) => {
	checkedItems.value = checkAll ? items : []
	isIndeterminate.value = false
}
