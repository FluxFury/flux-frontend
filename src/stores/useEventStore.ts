import { defineStore } from "pinia"
import { Person } from "@/types/person"
import { EventsSortingTypes } from "@/types/eventsStortingTypes"
import type { Event } from "@/types/event"

interface EventsState {
	events: Event[]
	filtered_events: Event[]
	timestamps: number[]
	persons: Person[]
	sort_type: EventsSortingTypes
	timestamps_filter: number[]
	persons_filter: Person[]
}

export const useEventsStore = defineStore("events", {
	state: (): EventsState => ({
		events: [],
		filtered_events: [],
		timestamps: [],
		persons: [],
		sort_type: null,
		timestamps_filter: [],
		persons_filter: []
	}),
	actions: {
		setEvents(events: Event[]) {
			this.events = events
			this.filterEvents()
			this.extractUniqueTimestampsAndPersons()
			this.sortEvents()
		},
		setSortType(sort_type: EventsSortingTypes) {
			this.sort_type = sort_type
			this.sortEvents()
		},
		setTimestampsFilter(timestamps: number) {
			this.timestamps_filter = timestamps
			this.filterEvents()
		},
		setPersonsFilter(persons: Person[]) {
			this.persons_filter = persons
			this.filterEvents()
		},
		filterEvents() {
			this.filtered_events = this.events.filter((event: Event) => {
				const timestamp_match =
					this.timestamps_filter.length === 0 || this.timestamps_filter.includes(event.timestamp)
				const person_match =
					this.persons_filter.length === 0 ||
					event.person_in_event.some((person: Person) => this.persons_filter.includes(person))
				return timestamp_match && person_match
			})
			this.sortEvents()
		},
		sortEvents() {
			if (this.sort_type === EventsSortingTypes.DATE) {
				this.filtered_events.sort((a: Event, b: Event) => new Date(b.timestamp) - new Date(a.timestamp))
			} else if (this.sort_type === EventsSortingTypes.PERSON) {
				this.filtered_events.sort((a: Event, b: Event) =>
					b.person_in_event[0].name.localeCompare(a.person_in_event[0].name)
				)
			}
		},
		extractUniqueTimestampsAndPersons() {
			const timestamps_set: Set<number> = new Set()
			const persons_set: Set<Person> = new Set()
			this.events.forEach((event: Event) => {
				timestamps_set.add(event.timestamp)
				event.person_in_event.forEach((person: Person) => persons_set.add(person))
			})
			this.timestamps = Array.from(timestamps_set)
			this.persons = Array.from(persons_set)
		}
	}
})
