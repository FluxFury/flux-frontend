import { defineStore } from "pinia"

export const useEventsStore = defineStore("events", {
	state: () => ({
		events: [],
		filtered_events: [],
		timestamps: [],
		persons: [],
		sort_type: "Date",
		timestamps_filter: [],
		persons_filter: []
	}),
	actions: {
		setEvents(events) {
			console.log(events)
			this.events = events
			this.filterEvents()
			this.extractUniqueTimestampsAndPersons()
			this.sortEvents()
		},
		setSortType(sort_type) {
			this.sort_type = sort_type
			this.sortEvents()
		},
		setTimestampsFilter(timestamps) {
			this.timestamps_filter = timestamps
			this.filterEvents()
		},
		setPersonsFilter(persons) {
			this.persons_filter = persons
			this.filterEvents()
		},
		filterEvents() {
			this.filtered_events = this.events.filter((event) => {
				const timestamp_match =
					this.timestamps_filter.length === 0 || this.timestamps_filter.includes(event.timestamp)
				const person_match =
					this.persons_filter.length === 0 ||
					event.persons.some((person) => this.persons_filter.includes(person))
				return timestamp_match && person_match
			})
			this.sortEvents()
		},
		sortEvents() {
			if (this.sort_type === "Date") {
				this.filtered_events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
			} else if (this.sort_type === "Person") {
				this.filtered_events.sort((a, b) => b.persons[0].localeCompare(a.persons[0]))
			}
		},
		extractUniqueTimestampsAndPersons() {
			const timestamps_set = new Set()
			const persons_set = new Set()
			this.events.forEach((event) => {
				timestamps_set.add(event.timestamp)
				event.persons.forEach((person) => persons_set.add(person))
			})
			this.timestamps = Array.from(timestamps_set)
			this.persons = Array.from(persons_set)
		}
	}
})
