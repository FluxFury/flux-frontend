<!--TODO: разбить на компоненты-->
<!--TODO: не забыть про импорты-->
<!--TODO: вынести тестовые данные в отдельные файлы, чтобы не мешали-->
<!--TODO: вместо текста вставлять тег в столбик "status" в таблице-->

<script setup>
import { ref, watch } from "vue"
import { Moon, Search, Sunny } from "@element-plus/icons-vue"

// import type { CheckboxValueType } from "element-plus"

const value1 = ref(true)
const input2 = ref("")
const src = "../src/assets/images/image 12.png"

const checkAll = ref(false)
const indeterminate = ref(false)
const value = ref([])
const cities = ref([
	{
		value: 'Beijing',
		label: 'Beijing',
	},
	{
		value: 'Shanghai',
		label: 'Shanghai',
	},
	{
		value: 'Nanjing',
		label: 'Nanjing',
	},
	{
		value: 'Chengdu',
		label: 'Chengdu',
	}
])

watch(value, (val) => {
	if (val.length === 0) {
		checkAll.value = false
		indeterminate.value = false
	} else if (val.length === cities.value.length) {
		checkAll.value = true
		indeterminate.value = false
	} else {
		indeterminate.value = true
	}
})

const handleCheckAll = (val) => {
	indeterminate.value = false
	if (val) {
		value.value = cities.value.map((_) => _.value)
	} else {
		value.value = []
	}
}

const valueZ = ref('')
const options = [
	{
		value: 'Option1',
		label: 'Option1',
	},
	{
		value: 'Option2',
		label: 'Option2',
	},
	{
		value: 'Option3',
		label: 'Option3',
	},
	{
		value: 'Option4',
		label: 'Option4',
	},
	{
		value: 'Option5',
		label: 'Option5',
	},
]

const currentPage2 = ref(5)
const pageSize2 = ref(100)
const size = ref('default')
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
	console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
	console.log(`current page: ${val}`)
}

const tableData = [
	{
		match: "Turkey - Albania",
		status: "LIVE",
		date: "08.10.1480 | 12:00",
		info: "X statements"
	},
	{
		match: "Turkey - Albania",
		status: "LIVE",
		date: "08.10.1480 | 12:00",
		info: "X statements"
	},
	{
		match: "Turkey - Albania",
		status: "LIVE",
		date: "08.10.1480 | 12:00",
		info: "X statements"
	},
	{
		match: "Turkey - Albania",
		status: "LIVE",
		date: "08.10.1480 | 12:00",
		info: "X statements"
	},
]
</script>

<template>
	<div>
		<el-container>
			<el-header class="header-container">
<!--				switch theme-->
				<div class="switch-container">
					<el-switch
						class="color-theme-switch"
						v-model="value1"
						:active-action-icon="Sunny"
						:inactive-action-icon="Moon"
					/>
				</div>

<!--				logo and search-->
				<div class="logo-and-search-container">
					<el-image	class="logoImage" :src="src"/>
					<el-input
						class="navbar-search-input"
						v-model="input2"
						placeholder="Search"
						:prefix-icon="Search"
					/>
				</div>
			</el-header>
			<el-main class="main-container">
				<div class="selects-container">

<!--					select sport -->
					<el-select
						v-model="valueZ"
						multiple
						clearable
						placeholder="Select"
						popper-class="custom-header"
						:max-collapse-tags="1"
						class="select-sport"
					>
						<template #header>
							<el-checkbox
								v-model="checkAll"
								:indeterminate="indeterminate"
								@change="handleCheckAll"
							>
								All
							</el-checkbox>
						</template>
						<el-option
							v-for="item in cities"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>

<!--					select league -->
					<el-select
						v-model="value"
						filterable
						placeholder="Select"
						class="select-league"
					>
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</div>

<!--				table and pagination-->
				<div class="table-and-pagination-links-container">
					<el-pagination
						v-model:current-page="currentPage2"
						v-model:page-size="pageSize2"
						:page-sizes="[100, 200, 300, 400]"
						:size="size"
						:disabled="disabled"
						:background="background"
						layout="sizes, prev, pager, next, jumper"
						:total="1000"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						class="table-pagination"
					/>

					<el-table
						:data="tableData"
						border
						class="matches-table"
					>
						<el-table-column prop="match" label="Match" />
						<el-table-column prop="status" label="Status" />
						<el-table-column prop="date" label="Date" />
						<el-table-column prop="info" label="Info" />
					</el-table>

					<el-pagination
						v-model:current-page="currentPage2"
						v-model:page-size="pageSize2"
						:page-sizes="[100, 200, 300, 400]"
						:size="size"
						:disabled="disabled"
						:background="background"
						layout="sizes, prev, pager, next, jumper"
						:total="1000"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						class="table-pagination"
					/>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<style lang="scss">

.header-container, .main-container {
	padding: 0;
	margin: 0;
	height: fit-content;
}

.header-container {
	margin-bottom: 2rem;
}

.main-container {
}

.color-theme-switch {
	margin-right: 1rem;
}

.logo-and-search-container{
	justify-content: space-between;
	display: flex;
	align-items: center;
}

.logoImage {
	width: 25vw;
	margin-left: 2rem;
}

.navbar-search-input {
	width: 50vw;
	height: fit-content;
	margin-right: 1.1rem;
	font-size: 20px;
	font-weight: lighter;
}

.switch-container {
	text-align: end;
	border-bottom: 3px solid var(--primary-color);
	margin-bottom: 2rem;
}

.custom-header {
	.el-checkbox {
		display: flex;
		height: unset;
	}
}

.selects-container {
	justify-content: space-between;
	display: flex;
	align-items: center;
	margin: 0 3rem 0 3rem;
}

.select-sport {
	width: 30vw;
	height: fit-content;
	font-size: 20px;
	//font-weight: lighter;
}

.select-league {
	width: 30vw;
	height: fit-content;
	font-size: 20px;
	//font-weight: lighter;
}

.table-and-pagination-links-container {
	margin: 2rem 3rem 0 3rem;
}

.table-pagination {
	width: fit-content;
	margin: auto;
}

.matches-table {
	margin: 0.5rem 0 0.5rem 0;
}
</style>
