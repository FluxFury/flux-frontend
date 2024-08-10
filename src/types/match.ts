export enum MatchTag {
	LIVE = "LIVE",
	FINISHED = "FINISHED",
	CANCELED = "CANCELED",
	SCHEDULED = "SCHEDULED"
}

export type Match = {
	id: number
	title: string
	status: MatchTag
	timestamp: number
	count_events: number
	home_team_id: number
	guest_team_id: number
	event_ids: number[]
}
