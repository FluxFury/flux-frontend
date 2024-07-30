export const handleCheckedChange = (checked, items, checkAll, isIndeterminate) => {
	const checkedCount = checked.length
	checkAll.value = checkedCount === items.length
	isIndeterminate.value = checkedCount > 0 && checkedCount < items.length
}
