<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import MatchHeader from "@/components/match/match-header/match-header.vue"
import Teams from "@/components/match/teams/teams.vue"
import MainEvents from "@/components/match/main-events/main-events.vue"
import { events } from "@/Utils/match_test_data.js"

const route = useRoute()
const match_data = ref(null)

onMounted(() => {
	if (route.query.match) {
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
