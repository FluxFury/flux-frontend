import type { Sport } from "@/types/sport"

export const sports_data: Sport[] = [
	{
		id: 1234567890,
		title: "Football",
		tournaments: [
			{
				id: 1234567890,
				title: "Football"
			},
			{
				id: 1234567890,
				title: "Serie-A"
			},
			{
				id: 1234567890,
				title: "Euro 2048"
			}
		]
	},
	{
		id: 1234567890,
		title: "Floorball",
		tournaments: [
			{
				id: 1234567890,
				title: "Latvian Open"
			},
			{
				id: 1234567890,
				title: "Moscow league"
			},
			{
				id: 1234567890,
				title: "Challenge cup"
			}
		]
	},
	{
		id: 1234567890,
		title: "Water polo",
		tournaments: [
			{
				id: 1234567890,
				title: "Paris Olympic Games 2024"
			},
			{
				id: 1234567890,
				title: "Wold cup 2008"
			},
			{
				id: 1234567890,
				title: "Water Premier League"
			}
		]
	}
]

//TODO: убрать это, вся информация в sports_data (SportResponse в будущем)
export const tournaments_data = [
	{
		value: "Champions League",
		label: "Champions League"
	},
	{
		value: "Zalupa League",
		label: "Zalupa League"
	},
	{
		value: "Premier League",
		label: "Premier League"
	},
	{
		value: "Euro 1488",
		label: "Euro 1488"
	},
	{
		value: "Serie-A",
		label: "Serie-A"
	}
]

export const initial_values = {
	checkAll_initial_value: false,
	select_sport_initial_value: [],
	indeterminate_initial_value: false,
	// select_tournament_initial_value: {}
	select_tournament_initial_value: ""
}
