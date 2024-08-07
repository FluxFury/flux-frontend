<script setup>
import { ArrowRight } from "@element-plus/icons-vue"
import { getTagType } from "@/Utils/getTagType.js"
import { getFormattedDate } from "@/Utils/getFormattedDate.js"

const props = defineProps(["match_title", "match_timestamp", "match_status"])
</script>

<template>
	<div class="match-header-container">
		<el-breadcrumb :separator-icon="ArrowRight" class="history-breadcrumb">
			<el-breadcrumb-item :to="{ path: '/' }">Main page</el-breadcrumb-item>
			<el-breadcrumb-item>Football matches</el-breadcrumb-item>
			<el-breadcrumb-item>
				{{ props.match_title }} {{ getFormattedDate(props.match_timestamp) }}
			</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="match-title-container">
			<el-avatar class="tournament-avatar" src="https://cdn.worldvectorlogo.com/logos/premier-league-1.svg" />
			<h3 class="match-title">{{ props.match_title }}</h3>
			<h3 class="match-date">{{ getFormattedDate(props.match_timestamp) }}</h3>
			<el-tag :type="getTagType(match_status)">
				{{ props.match_status }}
			</el-tag>
		</div>
		<el-divider class="match-title-bottom-divider" />
	</div>
</template>

<style scoped lang="scss">
.match-header-container {
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
	border: unset;
	border-radius: unset;
	background-color: unset;
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

.match-title-bottom-divider {
	margin: 0;
}
</style>
