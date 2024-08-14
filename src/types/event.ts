// https://docs.google.com/document/d/1DRSK2UpIS20Fp9tjJMq7viFWUZDd3B9fyVibhO5gPb8/edit?hl=ru
// Visit API docs if you have any questions

import { Person } from "@/types/person"

export type Event = {
	id: number
	title: string
	text: string
	timestamp: number
	person_in_event: Person[]
}
