<script setup>
import { team1, team2 } from "@/components/match/teams/data.js"

const props = defineProps(["match_title"])

const first_team_title = props.match_title.match(/^([\w\s]+)/)[0]
const second_team_title = props.match_title.match(/([\w\s]+)$/)[0]
</script>

<template>
	<div class="teams-container">
		<div class="team-roster-container">
			<div class="team-avatar-and-name-container">
				<el-avatar
					class="team-avatar"
					src="https://upload.wikimedia.org/wikipedia/ru/5/59/Russian_Football_Union_Logo.svg"
				/>
				<h1 class="team-name-header">
					<!--First team-->
					{{ first_team_title }}
				</h1>
			</div>
			<h3 class="team-main-roster-header">Main Roster</h3>
			<el-table :data="team1" border style="width: 100%">
				<el-table-column prop="name" label="Name" />
				<el-table-column prop="age" label="Age" />
				<el-table-column prop="height" label="Height" />
				<el-table-column prop="weight" label="Weight" />
				<el-table-column prop="pos" label="Position" />
			</el-table>
			<h3 class="team-bench-header">Bench</h3>
			<el-table :data="team1" border style="width: 100%">
				<el-table-column prop="name" label="Name" />
				<el-table-column prop="age" label="Age" />
				<el-table-column prop="height" label="Height" />
				<el-table-column prop="weight" label="Weight" />
				<el-table-column prop="pos" label="Position" />
			</el-table>
		</div>
		<div class="team-roster-container">
			<div class="team-avatar-and-name-container">
				<el-avatar
					style="margin-left: auto"
					class="team-avatar"
					src="https://upload.wikimedia.org/wikipedia/ru/5/59/Russian_Football_Union_Logo.svg"
				/>
				<h1 class="team-name-header">
					<!--Second team-->
					{{ second_team_title }}
				</h1>
			</div>

			<h3 class="team-main-roster-header" style="text-align: right">Main Roster</h3>

			<el-table :data="team2" border style="width: 100%">
				<el-table-column prop="name" label="Name" />
				<el-table-column prop="age" label="Age" />
				<el-table-column prop="height" label="Height" />
				<el-table-column prop="weight" label="Weight" />
				<el-table-column prop="pos" label="Position" />
			</el-table>
			<h3 class="team-bench-header" style="text-align: right">Bench</h3>
			<el-table :data="team2" border style="width: 100%">
				<el-table-column prop="name" label="Name" />
				<el-table-column prop="age" label="Age" />
				<el-table-column prop="height" label="Height" />
				<el-table-column prop="weight" label="Weight" />
				<el-table-column prop="pos" label="Position" />
			</el-table>
		</div>
	</div>
</template>

<style scoped lang="scss">
.teams-container {
	margin: 0 3rem 1rem 3rem;
	display: flex;
	justify-content: space-between;
}

.team-roster-container {
	width: 45vw;
}

.team-avatar-and-name-container {
	display: flex;
	align-items: center;
}

.team-avatar {
	background-color: unset;
	width: fit-content;
	margin-right: 0.5rem;
	border-radius: unset;
}

.team-main-roster-header,
.team-bench-header,
.team-name-header {
	font-weight: normal;
}
</style>
