export const getTagType = (status) => {
	switch (status) {
		case "LIVE":
			return "primary"
		case "FINISHED":
			return "success"
		case "SCHEDULED":
			return "warning"
		case "CANCELED":
			return "danger"
	}
}
