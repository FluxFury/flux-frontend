import { format } from "date-fns"

export const getFormattedDate = (timestamp) => {
	return format(new Date(timestamp), "dd.MM.yyyy HH:mm")
}
