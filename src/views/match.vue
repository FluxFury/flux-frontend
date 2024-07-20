<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from 'vue-router';


const route = useRoute()
const matchData = ref(null)

onMounted(() => {
	if (route.query.match) {
		matchData.value = JSON.parse(route.query.match)
	}
})
</script>

<template>
	<div>
		<h1>Match Details</h1>
		<div v-if="matchData">
			<p><strong>Match:</strong> {{ matchData.match }}</p>
			<p><strong>Status:</strong> {{ matchData.status }}</p>
			<p><strong>Date:</strong> {{ matchData.date }}</p>
			<p><strong>Info:</strong> {{ matchData.info }}</p>
		</div>
	</div>
</template>
