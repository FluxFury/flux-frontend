import { http } from './http'
import type { MatchDetails, MatchEventOut, Page, TeamOut } from '@/types/api'

export const apiMatch = {
  details: (match_id: string) =>
    http.get<MatchDetails>(`/match_page/matches/${match_id}`),

  teams: (match_id: string) =>
    http.get<TeamOut[]>(`/match_page/matches/${match_id}/teams`),

  events: (match_id: string, params: Record<string, unknown>) =>
    http.get<Page<MatchEventOut>>(
      `/match_page/matches/${match_id}/events`,
      { params }
    )
}