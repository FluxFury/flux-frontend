import { Tournament } from "@/types/tournament"

export type Sport = {
	id: number
	title: string
	tournaments: Tournament[]
}
