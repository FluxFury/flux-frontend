import { MatchTag } from "@/types/match"

export const getTagType = (status: MatchTag) => {
	switch (status) {
		case MatchTag.LIVE:
			return "primary"
		case MatchTag.FINISHED:
			return "success"
		case MatchTag.SCHEDULED:
			return "warning"
		case MatchTag.CANCELED:
			return "danger"
	}
}
