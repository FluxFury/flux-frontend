<script setup lang="ts">
import { ref, watch } from "vue"
import { sports_data, initial_values, tournaments_data } from "./data.ts"
import { Sport } from "@/types/sport"
import { Tournament } from "@/types/tournament"

const checkAll = ref<boolean>(initial_values.checkAll_initial_value)
const select_sport_value = ref<Sport[]>(initial_values.select_sport_initial_value)
const indeterminate = ref<boolean>(initial_values.indeterminate_initial_value)
const select_tournament_value = ref<Tournament>(initial_values.select_tournament_initial_value)

const sports = ref<Sport[]>(sports_data)
// const tournaments = ref<Tournament[]>([])
const tournaments = ref(tournaments_data)

const isSelectTournamentDisabled = ref(true)

watch(select_sport_value, (selected_sports: Sport[]) => {
	if (selected_sports.length === 0) {
		checkAll.value = initial_values.checkAll_initial_value
		select_tournament_value.value = initial_values.select_tournament_initial_value
		indeterminate.value = initial_values.indeterminate_initial_value
		isSelectTournamentDisabled.value = true
	} else if (selected_sports.length === sports.value.length) {
		checkAll.value = true
		indeterminate.value = false
		isSelectTournamentDisabled.value = false
		// TODO: добавить логику для изменения списка турниров исходя из информации из выбранных Sport
		// selected_sports.forEach((sport: Sport) => tournaments.value.add(sport.tournaments))
	} else {
		indeterminate.value = true
		isSelectTournamentDisabled.value = false
	}
})

const handleCheckAll = (val: boolean) => {
	indeterminate.value = false
	if (val) {
		// True
		select_sport_value.value = sports.value.map((_) => _.value)
	} else {
		// False
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
			placeholder="Select sport"
			popper-class="custom-header"
			:max-collapse-tags="1"
			class="select-sport"
		>
			<template #header>
				<el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
					All
				</el-checkbox>
			</template>
			<el-option v-for="item in sports" :key="item.id" :label="item.title" :value="item.title" />
		</el-select>

		<el-select
			v-model="select_tournament_value"
			filterable
			placeholder="Select tournament"
			class="select-tournament"
			:disabled="isSelectTournamentDisabled"
		>
			<el-option v-for="item in tournaments" :key="item.value" :label="item.label" :value="item.value" />
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
