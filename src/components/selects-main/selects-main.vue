<script setup>
import { ref, watch } from "vue"

import { sports_data, tournaments_data, initial_values } from "./data.js"


const checkAll = ref(initial_values.checkAll_initial_value)
const select_sport_value = ref(initial_values.select_sport_initial_value)
const indeterminate = ref(initial_values.indeterminate_initial_value)
const select_tournament_value = ref(initial_values.select_tournament_initial_value)
const sports = ref(sports_data)
const tournaments = ref(tournaments_data)

watch(select_sport_value, (val) => {
	if (val.length === 0) {
		checkAll.value = initial_values.checkAll_initial_value
		select_tournament_value.value = initial_values.select_tournament_initial_value
		indeterminate.value = initial_values.indeterminate_initial_value
	} else if (val.length === sports.value.length) {
		checkAll.value = true
		indeterminate.value = false
	} else {
		indeterminate.value = true
	}
})

const handleCheckAll = (val) => {
	indeterminate.value = false
	if (val) {
		select_sport_value.value = sports.value.map((_) => _.value)
	} else {
		select_sport_value.value = []
	}
}
</script>

<template>
  <div class="selects-container">
	<el-select
	  v-model="select_sport_value"
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
		  v-for="item in sports"
		  :key="item.value"
		  :label="item.label"
		  :value="item.value"
		/>
	</el-select>


	<el-select
	  v-model="select_tournament_value"
	  filterable
	  placeholder="Select"
	  class="select-tournament"
	>
	  <el-option
		v-for="item in tournaments"
		:key="item.value"
		:label="item.label"
		:value="item.value"
	  />
	</el-select>
  </div>
</template>

<style scoped lang="scss">
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

.select-tournament {
	width: 30vw;
	height: fit-content;
	font-size: 20px;
	//font-weight: lighter;
}

.custom-header {
	.el-checkbox {
		display: flex;
		height: unset;
	}
}
</style>
