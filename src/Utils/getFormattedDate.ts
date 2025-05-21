import { format } from "date-fns"

export const getFormattedDate = (date: string | number | Date, fallback = "-") => {
  try {
    const d = typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date

    // Проверяем валидность
    if (isNaN(d.getTime())) return fallback

    return format(d, "dd.MM.yyyy HH:mm")
  } catch {
    return fallback
  }
}