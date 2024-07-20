<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { table_data, initial_values } from './data.js'


const current_page = ref(initial_values.current_page_initial_value)
const page_size = ref(initial_values.page_size_initial_value)
const router = useRouter()

const handleSizeChange = (val) => {
	console.log(`${val} items per page`)
}

const handleCurrentChange = (val) => {
	console.log(`current page: ${val}`)
}

const getTagType = (status) => {
	switch (status) {
		case "LIVE":
			return "primary"
		case "FINISHED":
			return "success"
		case "SCHEDULED":
			return "warning"
		case "CANCELED":
			return "danger"
	}
}

const handleRowClick = (row) => {
	if (row.status !== 'CANCELED') {
		router.push({ path: `/match/${row.id}` })
	}
}

const tableRowClassName = ({ row }) => {
	return row.status === "CANCELED" ? "canceled-row" : ""
}
</script>

<template>
	<div class="table-and-pagination-links-container">
		<el-pagination
			v-model:current-page="current_page"
			v-model:page-size="page_size"
			:page-sizes="[100, 200, 300, 400]"
			layout="sizes, prev, pager, next, jumper"
			:total="1000"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			class="table-pagination"
		/>

		<el-table
			:data="table_data"
			border
			class="matches-table"
			@row-click="handleRowClick"
			:row-class-name="tableRowClassName"
		>
			<el-table-column prop="match" label="Match" />
			<el-table-column label="Status">
				<template #default="scope">
					<el-tag :type="getTagType(scope.row.status)">
						{{ scope.row.status }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="date" label="Date" />
			<el-table-column prop="info" label="Info" />
		</el-table>

		<el-pagination
			v-model:current-page="current_page"
			v-model:page-size="page_size"
			:page-sizes="[100, 200, 300, 400]"
			layout="sizes, prev, pager, next, jumper"
			:total="1000"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			class="table-pagination"
		/>
	</div>
</template>

<style lang="scss">
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

.el-table .canceled-row {
	--el-table-tr-bg-color: var(--canceled-match-background-color);
	color: var(--secondary-color);
	//cursor: not-allowed;
	pointer-events: none;
}

</style>
