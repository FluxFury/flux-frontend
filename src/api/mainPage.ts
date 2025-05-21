
import { http } from "./http"
import type { SportOut, CompetitionOut, MatchStatusOut, MatchOut, Page } from "@/types/api"

export const apiMain = {
    sports:   () => http.get<SportOut[]>("/main_page/sports"),
    statuses: () => http.get<MatchStatusOut[]>("/main_page/statuses"),
  competitions:(sport_id: string)=> http.get<CompetitionOut[]>(`/main_page/sports/${sport_id}/competitions`),

  matches: (params: {
    page?: number; page_size?: number
    sport_id?: string; status_id?: string; status?: string; search?: string
  }) => http.get<Page<MatchOut>>("/main_page/matches", { params })
}

