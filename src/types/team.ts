import { Person } from "@/types/person"

export type Team = {
	id: number
	title: string
	main_roster_players: Person[]
	benched_players: Person[]
}
