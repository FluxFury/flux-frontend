import { defineStore } from "pinia"

export const useEventsStore = defineStore("events", {
	state: () => ({
		events: [],
		filtered_events: [],
		dates: [],
		persons: [],
		sort_type: "Person",
		dates_filter: [],
		persons_filter: []
	}),
	actions: {
		setEvents(events) {
			console.log(events)
			this.events = events
			this.filterEvents()
			this.extractUniqueDatesAndPersons()
			this.sortEvents()
		},
		setSortType(sort_type) {
			this.sort_type = sort_type
			this.sortEvents()
		},
		setDatesFilter(dates) {
			this.dates_filter = dates
			this.filterEvents()
		},
		setPersonsFilter(persons) {
			this.persons_filter = persons
			this.filterEvents()
		},
		filterEvents() {
			this.filtered_events = this.events.filter((event) => {
				const dateMatch = this.dates_filter.length === 0 || this.dates_filter.includes(event.date)
				const personMatch =
					this.persons_filter.length === 0 ||
					event.persons.some((person) => this.persons_filter.includes(person))
				return dateMatch && personMatch
			})
		},
		sortEvents() {
			if (this.sort_type === "Date") {
				this.filtered_events.sort((a, b) => new Date(b.date) - new Date(a.date))
			} else if (this.sort_type === "Person") {
				this.filtered_events.sort((a, b) => b.persons[0].localeCompare(a.persons[0]))
			}
		},
		extractUniqueDatesAndPersons() {
			const dates_set = new Set()
			const persons_set = new Set()
			this.events.forEach((event) => {
				dates_set.add(event.date)
				event.persons.forEach((person) => persons_set.add(person))
			})
			this.dates = Array.from(dates_set)
			this.persons = Array.from(persons_set)
		}
	}
})
