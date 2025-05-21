// src/stores/useMainStore.ts
import { defineStore } from "pinia"
import { apiMain } from "@/api/mainPage"
import type { SportOut, CompetitionOut, MatchOut, MatchStatusOut, Page } from "@/types/api"

interface State {
    sports: SportOut[]
    competitions: CompetitionOut[]
    statuses: MatchStatusOut[]        // если где-то ещё нужны
    matchesPage: Page<MatchOut> | null
  
    sport_id?: string
    competition_id?: string           // ← NEW
    status_id?: string                // оставляем, вдруг пригодится
    page: number
    page_size: number
    searchTerm: string
  }
export const useMainStore = defineStore("main", {
  state: (): State => ({
    sports: [], statuses: [], competitions: [], matchesPage: null,
    sport_id: undefined, status_id: undefined, page: 1, page_size: 10,
    searchTerm: ""
  }),

  actions: {
    async loadSports()   { this.sports   = (await apiMain.sports()).data },
    async loadStatuses() { this.statuses = (await apiMain.statuses()).data },

    async bootstrap() {
        const [sports, statuses] = await Promise.all([
          apiMain.sports(),
          apiMain.statuses(),
        ])
        this.sports   = sports.data
        this.statuses = statuses.data
      },
  
      async loadCompetitions() {
        if (!this.sport_id) { this.competitions = []; return }
        this.competitions =
          (await apiMain.competitions(this.sport_id)).data
      },
  
      async loadMatches() {
        this.matchesPage = (await apiMain.matches({
          page: this.page,
          page_size: this.page_size,
          sport_id: this.sport_id,
          competition_id: this.competition_id,   // ← NEW
        })).data
      }
  }
})
