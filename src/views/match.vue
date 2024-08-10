<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import MatchHeader from "@/components/match/match-header/match-header.vue"
import Teams from "@/components/match/teams/teams.vue"
import MainEvents from "@/components/match/main-events/main-events.vue"
import { events } from "@/Utils/matchTestData"
import type { Match } from "@/types/match"

const route = useRoute()
const match_data = ref<Match>()

onMounted(() => {
	if (typeof route.query.match === "string") {
		match_data.value = JSON.parse(route.query.match)
	}
})
</script>

<template>
	<match-header
		v-if="match_data"
		:match_title="match_data.title"
		:match_timestamp="match_data.timestamp"
		:match_status="match_data.status"
	/>

	<teams v-if="match_data" :match_title="match_data.title" />

	<main-events :events="events" />
</template>

<style lang="scss"></style>
