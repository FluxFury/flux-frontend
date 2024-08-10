import { format } from "date-fns"

export const getFormattedDate = (timestamp: number) => {
	return format(new Date(timestamp), "dd.MM.yyyy HH:mm")
}
