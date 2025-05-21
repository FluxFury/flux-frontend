// https://docs.google.com/document/d/1DRSK2UpIS20Fp9tjJMq7viFWUZDd3B9fyVibhO5gPb8/edit?hl=ru
// Visit API docs if you have any questions

export enum MatchTag {
	LIVE = "LIVE",
	FINISHED = "FINISHED",
	CANCELLED = "CANCELLED",
	SCHEDULED = "SCHEDULED"
}

export type Match = {
	id: number
	title: string
	competition_name: string | null
	competition_logo_url: string | null
	status: MatchTag
	timestamp: number
	count_events: number
	home_team_id: number
	guest_team_id: number
	event_ids: number[]
}
