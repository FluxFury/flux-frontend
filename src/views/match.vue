<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { ArrowRight } from "@element-plus/icons-vue"

import { getTagType } from "@/Utils/getTagType.js"


const route = useRoute()
const match_data = ref(null)

onMounted(() => {
	if (route.query.match) {
		match_data.value = JSON.parse(route.query.match)
	}
})

const team = [
	{
		name: "Denis Kochkin",
		age: 54,
		height: 148,
		weight: 120,
		pos: "CAM"
	},
	{
		name: "Denis Kochkin",
		age: 54,
		height: 148,
		weight: 120,
		pos: "CAM"
	},
	{
		name: "Denis Kochkin",
		age: 54,
		height: 148,
		weight: 120,
		pos: "CAM"
	}
]

const value = ref('')

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

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

const handleCheckAllChange = (val) => {
	checkedCities.value = val ? cities : []
	isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value) => {
	const checkedCount = value.length
	checkAll.value = checkedCount === cities.length
	isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
</script>

<template>
	<div class="match-header-container" v-if="match_data">
		<el-breadcrumb
			:separator-icon="ArrowRight"
			class="history-breadcrumb"
		>
			<el-breadcrumb-item :to="{path: '/'}">
				Main page
			</el-breadcrumb-item>
			<el-breadcrumb-item>Football matches</el-breadcrumb-item>
			<el-breadcrumb-item>
				{{ match_data.match }} {{ match_data.date }}
			</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="match-title-container">
			<el-avatar
				class="tournament-avatar"
				src="https://cdn.worldvectorlogo.com/logos/premier-league-1.svg"
			/>
			<h3 class="match-title">{{ match_data.match }}</h3>
			<h3 class="match-date">{{ match_data.date }}</h3>
			<el-tag
				:type="getTagType(match_data.status)"
			>
				{{ match_data.status }}
			</el-tag>
		</div>
		<el-divider class="match-title-bottom-divider"/>
	</div>
	<div class="teams-container" v-if="match_data">
		<div class="team-roster-container">
			<div class="team-avatar-and-name-container">
				<el-avatar
					class="team-avatar"
					src="https://upload.wikimedia.org/wikipedia/ru/5/59/Russian_Football_Union_Logo.svg"
				/>
				<h1 class="team-name-header">
					<!--First team-->
					{{ match_data.match.match(/^([\w\s]+)/)[0] }}
				</h1>
			</div>
			<h3 class="team-main-roster-header">Main Roster</h3>
			<el-table :data="team" border style="width: 100%">
				<el-table-column prop="name" label="Name" />
				<el-table-column prop="age" label="Age" />
				<el-table-column prop="height" label="Height" />
				<el-table-column prop="weight" label="Weight" />
				<el-table-column prop="pos" label="Position" />
			</el-table>
			<h3
				class="team-bench-header"
			>
				Bench
			</h3>
			<el-table :data="team" border style="width: 100%">
				<el-table-column prop="name" label="Name" />
				<el-table-column prop="age" label="Age" />
				<el-table-column prop="height" label="Height" />
				<el-table-column prop="weight" label="Weight" />
				<el-table-column prop="pos" label="Position" />
			</el-table>
		</div>
		<div class="team-roster-container">
			<div
				class="team-avatar-and-name-container"
			>
				<el-avatar
					style="margin-left: auto"
					class="team-avatar"
					src="https://upload.wikimedia.org/wikipedia/ru/5/59/Russian_Football_Union_Logo.svg"
				/>
				<h1 class="team-name-header">
					<!--Second team-->
					{{ match_data.match.match(/([\w\s]+)$/)[0] }}
				</h1>
			</div>

			<h3
				class="team-main-roster-header"
				style="text-align: right"
			>
				Main Roster
			</h3>

			<el-table
				:data="team"
				border
				style="width: 100%"
			>
				<el-table-column prop="name" label="Name" />
				<el-table-column prop="age" label="Age" />
				<el-table-column prop="height" label="Height" />
				<el-table-column prop="weight" label="Weight" />
				<el-table-column prop="pos" label="Position" />
			</el-table>
			<h3
				class="team-bench-header"
				style="text-align: right"
			>
				Bench
			</h3>
			<el-table
				:data="team"
				border
				style="width: 100%"
			>
				<el-table-column prop="name" label="Name" />
				<el-table-column prop="age" label="Age" />
				<el-table-column prop="height" label="Height" />
				<el-table-column prop="weight" label="Weight" />
				<el-table-column prop="pos" label="Position" />
			</el-table>
		</div>
	</div>

	<div class="main-events-container">
		<el-divider class="events-and-match-header-divider"/>
		<div class="main-events-header-container">
			<h1 class="main-events-header">
				Main events
			</h1>
			<el-select
				v-model="value"
				placeholder="Select"
				style="width: 240px"
				class="events-sort-select"
			>
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
		</div>
		<el-container>
			<el-main
				class="events-list-container"
			>
				<el-timeline
				>
					<el-timeline-item
						timestamp="22.08.2020 18:18"
					>
						<h2
							class="timeline-event-header"
						>
							Ronaldo broke his leg
						</h2>
						<p>
							“My leg is broken” - Ronaldo said when russian patriot shoot him with ak-47!
						</p>
					</el-timeline-item>
					<el-timeline-item
						timestamp="22.08.2020 18:18"
					>
						<h2
							class="timeline-event-header"
						>
							Messi’s fan made Haaland cry in a restaurant
						</h2>
						<p>”Франция была технически превзойдена Испанией — она оказалась неспособна вывести её из своей стихии. Команда отдала преимущество, безуспешно пытаясь вновь и вновь атаковать. Она уезжает из Германии с горечью от поражения и сомнениями на душе. Это болезненный провал, ведь лучшая европейская сборная последних двух чемпионатов мира была сбита с ног и просто пинала мяч, будучи не в состоянии оказывать давление. Команда была беспомощна словно дети перед гигантским быком. Ни один из игроков центра поля не управлялся достаточно хорошо с мячом, никто из них не был хорош и без мяча. Дешам даже не скрывал своего раздражения в перерыве из-за того, что команда уже не идёт вперед.”  - said Messi’s fan to Haaland. His girlfriend says that he is stable, but she thinks that he won’t play against Chelsea.</p>
					</el-timeline-item>
				</el-timeline>
			</el-main>
			<el-aside
				class="events-filter-aside"
			>
				<div class="events-filter-container">
					<h3
						class="filter-section-header"
					>
						Date
					</h3>
					<el-checkbox

						v-model="checkAll"
						:indeterminate="isIndeterminate"
						@change="handleCheckAllChange"
					>
						All
					</el-checkbox>
					<el-checkbox-group
						class="filter-checkbox-group"
						v-model="checkedCities"
						@change="handleCheckedCitiesChange"
					>
						<el-checkbox
							class="filter-checkbox-item"
							v-for="city in cities"
							:key="city"
							:label="city"
							:value="city"
						>
							{{ city }}
						</el-checkbox>
					</el-checkbox-group>

					<h3
						class="filter-section-header"
					>
						Person
					</h3>
					<el-checkbox

						v-model="checkAll"
						:indeterminate="isIndeterminate"
						@change="handleCheckAllChange"
					>
						All
					</el-checkbox>
					<el-checkbox-group
						class="filter-checkbox-group"
						v-model="checkedCities"
						@change="handleCheckedCitiesChange"
					>
						<el-checkbox
							class="filter-checkbox-item"
							v-for="city in cities"
							:key="city"
							:label="city"
							:value="city"
						>
							{{ city }}
						</el-checkbox>
					</el-checkbox-group>
				</div>
			</el-aside>
		</el-container>
	</div>
</template>

<style lang="scss">
.match-header-container{
	margin: 0 3rem 0 3rem;
}

.history-breadcrumb {
	margin-right: 0.5rem;
	line-height: unset;
}

.match-title-container {
	display: flex;
	margin-top: 0.5rem;
	align-items: center;
}

.tournament-avatar {
	border: 2px solid gray;
}

.match-title {
	font-weight: normal;
	margin-left: 1rem;
}

.match-date {
	font-weight: normal;
	margin: 0 0.5rem 0 0.5rem;
	opacity: 60%;
}

.match-title-bottom-divider, .events-and-match-header-divider {
	margin: 0;
}

.teams-container {
	margin: 0 3rem 1rem 3rem;
	display: flex;
	justify-content: space-between;
}

.team-roster-container {
	width: 45vw;
}

.team-avatar {
	background-color: unset;
	width: fit-content;
	margin-right: 0.5rem;
}

.team-avatar-and-name-container{
	display: flex;
	align-items: center;
}

.team-main-roster-header, .team-bench-header, .team-name-header, .main-events-header {
	font-weight: normal;
}

.main-events-container {
	margin: 1rem 3rem 0 3rem;
}

.main-events-header-container {
	display: flex;
	align-items: center;
}

.events-sort-select {
	margin-left: 1rem;
}

.events-list-container {
	padding: 0;
}

.timeline-event-header {
	margin: 0;
	font-weight: normal;
}

.events-filter-aside {
	border-left: 1px var(--el-border-color) var(--el-border-style);
	margin-left: 1rem;
}

ul {
	padding-inline-start: 1px;
}

.filter-section-header {
	font-weight: normal;
	margin-bottom: 0;
}

.events-filter-container {
	margin-left: 1rem;
}

.filter-checkbox-item {
	width: 100%;
}
</style>
