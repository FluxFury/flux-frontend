import { defineStore } from "pinia"

export interface MatchEventOut {
  id?: string
  news_creation_time?: string
  timestamp?: string | number
  text: string
  header?: string
  title?: string
  respective_relevance?: number | null
  keywords?: {
    People?: string[]
    Events?: string[]
    Organizations?: string[]
    Other?: string[]
  }
}

type SortType = "date_desc" | "date_asc" | "relevance"

export const useEventsStore = defineStore("events", {
  state: () => ({
    /** оригинальные события, как пришли с бэка */
    rawEvents      : []      as MatchEventOut[],

    /** активные фильтры */
    timestampsFilter: []     as number[],   // миллисекунды
    personsFilter   : []     as string[],
    eventsFilter    : []     as string[],
    orgsFilter      : []     as string[],

    /** текущий способ сортировки */
    sortType        : "date_desc" as SortType,
  }),

  getters: {
    /** все (уникальные) даты в миллисекундах, отсортированы от новых к старым */
    timestamps: (s) => Array.from(
      new Set(
        s.rawEvents
          .map(e => Date.parse(e.news_creation_time ?? (e.timestamp as string)))
          .filter(n => !Number.isNaN(n))
      )
    ).sort((a, b) => b - a),

    /** все People / Events / Orgs как массивы строк */
    persons: (s) => getUniqueKeywords(s.rawEvents, "People"),
    events : (s) => getUniqueKeywords(s.rawEvents, "Events"),
    orgs   : (s) => getUniqueKeywords(s.rawEvents, "Organizations"),

    /** отфильтрованные и отсортированные события — именно то, что рендерится */
    filtered_events (s): MatchEventOut[] {
      let list = [...s.rawEvents]

      // ====== КРИТИЧЕСКАЯ ИЗМЕНЕННАЯ ЛОГИКА ======
      // Если фильтр (любой) НЕ выбран - НИЧЕГО не показывать (если в нем есть опции)
      // Проверяем для каждого фильтра, есть ли соответствующие опции в исходных данных

      // По дате
      if (s.timestamps.length && s.timestampsFilter.length === 0) {
        return []
      }
      // По людям
      if (s.persons.length && s.personsFilter.length === 0) {
        return []
      }
      // По событиям
      if (s.events.length && s.eventsFilter.length === 0) {
        return []
      }
      // По организациям
      if (s.orgs.length && s.orgsFilter.length === 0) {
        return []
      }

      // --- Обычная фильтрация, если какие-то фильтры выбраны ---
      if (s.timestampsFilter.length) {
        const set = new Set(s.timestampsFilter)
        list = list.filter(e => set.has(
          Date.parse(e.news_creation_time ?? (e.timestamp as string))
        ))
      }
      if (s.personsFilter.length)
        list = list.filter(e => hasAnyKeyword(e, "People", s.personsFilter))
      if (s.eventsFilter.length)
        list = list.filter(e => hasAnyKeyword(e, "Events", s.eventsFilter))
      if (s.orgsFilter.length)
        list = list.filter(e => hasAnyKeyword(e, "Organizations", s.orgsFilter))

      // --- Сортировка ---
      switch (s.sortType) {
        case "date_asc":
          list.sort((a, b) => +getDate(a) - +getDate(b))
          break
        case "relevance":
          list.sort((a, b) =>
            (b.respective_relevance ?? -Infinity) -
            (a.respective_relevance ?? -Infinity)
          )
          break
        default: // date_desc
          list.sort((a, b) => +getDate(b) - +getDate(a))
      }

      return list
    },
  },

  actions: {
    setEvents(events: MatchEventOut[]) {
      this.rawEvents = events
    },
    setTimestampsFilter(v: number[]) { this.timestampsFilter = v },
    setPersonsFilter   (v: string[]) { this.personsFilter    = v },
    setEventsFilter    (v: string[]) { this.eventsFilter     = v },
    setOrgsFilter      (v: string[]) { this.orgsFilter       = v },
    setSortType(type: SortType)      { this.sortType = type }
  }
})

function getDate(e: MatchEventOut) {
  return new Date(e.news_creation_time ?? (e.timestamp as string))
}
function getUniqueKeywords(evts: MatchEventOut[], field: keyof MatchEventOut["keywords"]) {
  const set = new Set<string>()
  evts.forEach(e => e.keywords?.[field]?.forEach(k => set.add(k)))
  return Array.from(set).sort()
}
function hasAnyKeyword(e: MatchEventOut, field: keyof MatchEventOut["keywords"], selected: string[]) {
  const src = e.keywords?.[field] ?? []
  return src.some(k => selected.includes(k))
}
