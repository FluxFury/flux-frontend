export function getMediaUrl(path?: string) {
    if (!path) return ""
    // если уже абсолютный — возвращаем как есть
    if (path.startsWith("http")) return path
    // иначе — приставляем базу
    return `${import.meta.env.VITE_MEDIA_BASE_URL}${path}`
  }