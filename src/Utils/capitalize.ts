export function capitalize(s?: string) {
    if (!s) return ''
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
  }