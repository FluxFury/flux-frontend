<script lang="ts" setup>
import { getMediaUrl } from "@/Utils/getMediaUrl"
import { ArrowRight } from "@element-plus/icons-vue"
import { getTagType } from "@/Utils/getTagType.ts"
import { getFormattedDate } from "@/Utils/getFormattedDate.ts"
import { capitalize } from "@/Utils/capitalize"
import type { MatchTag } from "@/types/match"

const props = defineProps<{
	match_title: string
	match_timestamp: number
	match_status: MatchTag
	competition_name: string
	competition_logo_url?: string
}>()
</script>

<template>
	<div class="match-header-container">
		<el-breadcrumb :separator-icon="ArrowRight" class="history-breadcrumb">
			<el-breadcrumb-item :to="{ path: '/' }">Main page</el-breadcrumb-item>
			<el-breadcrumb-item v-if="props.competition_name">
			{{ props.competition_name }} matches
			</el-breadcrumb-item>
			<el-breadcrumb-item v-else>
			Unknown competition
			</el-breadcrumb-item>
			<el-breadcrumb-item>
				{{ props.match_title }} {{ getFormattedDate(props.match_timestamp) }}
			</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="match-title-container">
			<img
				v-if="props.competition_logo_url"
				class="tournament-avatar"
				:src="getMediaUrl(props.competition_logo_url)"
			/>
			<h3 class="match-title">{{ props.match_title }}</h3>
			<h3 class="match-date">{{ getFormattedDate(props.match_timestamp) }}</h3>
			<el-tag :type="getTagType(props.match_status)">
				{{ capitalize(props.match_status) }}
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
	object-fit: contain;
	width: 10%;
	height: 10%;
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
