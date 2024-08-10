import { Person } from "@/types/person"

export type Event = {
	id: number
	title: string
	text: string
	timestamp: number
	person_in_event: Person[]
}
