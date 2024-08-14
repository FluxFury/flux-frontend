// https://docs.google.com/document/d/1DRSK2UpIS20Fp9tjJMq7viFWUZDd3B9fyVibhO5gPb8/edit?hl=ru
// Visit API docs if you have any questions

import { Tournament } from "@/types/tournament"

export type Sport = {
	id: number
	title: string
	tournaments: Tournament[]
}
