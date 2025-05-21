// src/stores/useMatchStore.ts
import { defineStore } from 'pinia'
import { apiMatch } from '@/api/matchPage'
import type { MatchDetails, TeamOut, MatchEventOut, Page } from '@/types/api'

interface MatchState {
  details?: MatchDetails
  teams: TeamOut[]
  events: Page<MatchEventOut> | null
  facets: {
    available_dates: { date: string; count: number }[]
    people:          { keyword: string; count: number }[]
    orgs:            { keyword: string; count: number }[]
    locations:       { keyword: string; count: number }[]
    events_kw:       { keyword: string; count: number }[]
    others:          { keyword: string; count: number }[]
  }
  order: string
  page: number
  page_size: number
}
export const useMatchStore = defineStore('match', {
  state: (): MatchState => ({
    teams: [],
    events: null,  // Page<MatchEventOut> | null
    facets: {
      available_dates: [],
      people: [],
      orgs: [],
      locations: [],
      events_kw: [],
      others: [],
    },
    order: '-timestamp',
    page: 1,
    page_size: 50
  }),
  actions: {
    async init(match_id: string) {
      // детали + статус
      const d = await apiMatch.details(match_id)
      this.details = d.data

      // составы двух команд
      const t = await apiMatch.teams(match_id)
      this.teams = t.data

      // события
      await this.loadEvents(match_id)
    },
    async loadEvents(match_id: string) {
      const resp = await apiMatch.events(match_id, {
        // если не хотите фильтровать на бэкенде — просто не передаём people/orgs и т.п.
        order:     this.order,
        page:      this.page,
        page_size: this.page_size,
      })
      // сохранить весь Page<MatchEventOut>
      this.events = resp.data
      // и фасеты
      this.facets = resp.data.facets as any
    }
  }
})
