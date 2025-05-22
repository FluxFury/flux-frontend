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


	  if (s.timestamps.length && s.timestampsFilter.length === 0) return []
	  if (s.persons.length    && s.personsFilter.length   === 0) return []
	  if (s.events.length     && s.eventsFilter.length    === 0) return []
	  if (s.orgs.length       && s.orgsFilter.length      === 0) return []
	
	  /* ==== активность фильтров ==== */
	  const dateActive   = s.timestampsFilter.length && s.timestampsFilter.length < s.timestamps.length
	  const peopleActive = s.personsFilter.length   && s.personsFilter.length    < s.persons.length
	  const eventsActive = s.eventsFilter.length    && s.eventsFilter.length     < s.events.length
	  const orgsActive   = s.orgsFilter.length      && s.orgsFilter.length       < s.orgs.length
	
	  /* ======= применяем ======= */
	
	  /* ДАТА – как было: показываем только выбранные даты */
	  if (dateActive) {
		const set = new Set(s.timestampsFilter)
		list = list.filter(e =>
		  set.has(Date.parse(e.news_creation_time ?? (e.timestamp as string)))
		)
	  }
	
	  /* PEOPLE – убираем события, содержащие хоть один снятый чек-бокс */
	  if (peopleActive) {
		const excluded = new Set(
		  s.persons.filter(p => !s.personsFilter.includes(p))
		)
		list = list.filter(e =>
		  !(e.keywords?.People ?? []).some(p => excluded.has(p))
		)
	  }
	
	  /* EVENTS */
	  if (eventsActive) {
		const excluded = new Set(
		  s.events.filter(ev => !s.eventsFilter.includes(ev))
		)
		list = list.filter(e =>
		  !(e.keywords?.Events ?? []).some(ev => excluded.has(ev))
		)
	  }
	
	  /* ORGS */
	  if (orgsActive) {
		const excluded = new Set(
		  s.orgs.filter(o => !s.orgsFilter.includes(o))
		)
		list = list.filter(e =>
		  !(e.keywords?.Organizations ?? []).some(o => excluded.has(o))
		)
	  }
	

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
