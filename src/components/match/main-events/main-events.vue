<script setup>
import { ref, watch } from "vue"
import { sort_options, initial_values } from "@/components/match/main-events/data.js"
import { handleCheckAllChange } from "@/Utils/handleCheckAllChange.js"
import { handleCheckedChange } from "@/Utils/handleCheckedChange.js"
import { useEventsStore } from "@/stores/useEventStore.js"
import { getFormattedDate } from "@/Utils/getFormattedDate.js"

const props = defineProps(["events"])

const event_store = useEventsStore()

event_store.setEvents(props.events)

const sort_type_value = ref(event_store.sort_type)

const dates_params = {
	check_all: ref(initial_values.dates_check_all_initial_value),
	is_indeterminate: ref(initial_values.dates_is_indeterminate_initial_value),
	checked: ref(event_store.timestamps)
}

const persons_params = {
	check_all: ref(initial_values.persons_check_all_initial_value),
	is_indeterminate: ref(initial_values.persons_is_indeterminate_initial_value),
	checked: ref(event_store.persons)
}

watch(
	() => dates_params.checked.value,
	// here we use timestamps instead of dates
	(new_timestamps) => event_store.setTimestampsFilter(new_timestamps)
)

watch(
	() => persons_params.checked.value,
	(new_persons) => event_store.setPersonsFilter(new_persons)
)

watch(
	() => sort_type_value.value,
	(new_sort_type) => event_store.setSortType(new_sort_type)
)
</script>

<template>
	<div class="main-events-container">
		<el-divider class="events-and-match-header-divider" />
		<div class="main-events-header-container">
			<h1 class="main-events-header">Main events</h1>
			<el-select v-model="sort_type_value" placeholder="Sort by" style="width: 240px" class="events-sort-select">
				<el-option v-for="item in sort_options" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</div>
		<el-container>
			<el-main class="events-list-container">
				<el-timeline>
					<el-timeline-item
						v-for="event in event_store.filtered_events"
						:timestamp="getFormattedDate(event.timestamp)"
					>
						<h2 class="timeline-event-header">{{ event.title }}</h2>
						<p>{{ event.text }}</p>
					</el-timeline-item>
				</el-timeline>
			</el-main>
			<el-aside class="events-filter-aside">
				<div class="events-filter-container">
					<h3 class="filter-section-header">Date</h3>
					<el-checkbox
						v-model="dates_params.check_all.value"
						:indeterminate="dates_params.is_indeterminate.value"
						@change="
							(checkAll) =>
								handleCheckAllChange(
									checkAll,
									event_store.timestamps,
									dates_params.checked,
									dates_params.is_indeterminate
								)
						"
					>
						All
					</el-checkbox>
					<el-checkbox-group
						class="filter-checkbox-group"
						v-model="dates_params.checked.value"
						@change="
							(checked) =>
								handleCheckedChange(
									checked,
									event_store.timestamps,
									dates_params.check_all,
									dates_params.is_indeterminate
								)
						"
					>
						<el-checkbox
							class="filter-checkbox-item"
							v-for="timestamp in event_store.timestamps"
							:key="timestamp"
							:label="getFormattedDate(timestamp)"
							:value="timestamp"
						>
							{{ getFormattedDate(timestamp) }}
						</el-checkbox>
					</el-checkbox-group>
					<h3 class="filter-section-header">Person</h3>
					<el-checkbox
						v-model="persons_params.check_all.value"
						:indeterminate="persons_params.is_indeterminate.value"
						@change="
							(checkAll) =>
								handleCheckAllChange(
									checkAll,
									event_store.persons,
									persons_params.checked,
									persons_params.is_indeterminate
								)
						"
					>
						All
					</el-checkbox>
					<el-checkbox-group
						class="filter-checkbox-group"
						v-model="persons_params.checked.value"
						@change="
							(checked) =>
								handleCheckedChange(
									checked,
									event_store.persons,
									persons_params.check_all,
									persons_params.is_indeterminate
								)
						"
					>
						<el-checkbox
							class="filter-checkbox-item"
							v-for="person in event_store.persons"
							:key="person"
							:label="person"
							:value="person"
						>
							{{ person }}
						</el-checkbox>
					</el-checkbox-group>
				</div>
			</el-aside>
		</el-container>
	</div>
</template>

<style scoped lang="scss">
.main-events-header {
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

.events-and-match-header-divider {
	margin: 0;
}
</style>
