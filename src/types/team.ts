// https://docs.google.com/document/d/1DRSK2UpIS20Fp9tjJMq7viFWUZDd3B9fyVibhO5gPb8/edit?hl=ru
// Visit API docs if you have any questions

import { Person } from "@/types/person"

export type Team = {
	id: number
	title: string
	main_roster_players: Person[]
	benched_players: Person[]
}
