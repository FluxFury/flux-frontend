// src/types/api.ts
export type PageMeta = {
    page:        number
    page_size:   number
    total_items: number
    total_pages: number
  }
  
  export type Page<T> = {
    data:  T[]
    meta:  PageMeta
    facets?: Record<string, unknown>  // есть только у /events
  }
  
  // --- Main page ---
  export interface SportOut        { sport_id: string; name: string }
  export interface CompetitionOut  { competition_id: string; name: string }
  export interface MatchStatusOut  { status_id: string; name: string }
  export interface MatchOut {
    match_id: string
    match_name: string
    pretty_match_name: string
    status_name: string
    planned_start_datetime: string   // ISO-8601
    end_datetime:          string | null
    news_count: number
  }
  
  // --- Match page ---
  export interface MatchDetails extends MatchOut {
    created_at: string
    updated_at: string
    competition_name: string | null
    competition_logo_url: string | null
  }
  
  export interface TeamMember {
    player_id: string
    name:      string
    nickname?: string
    age:       number
    country?:  string
    status?:   string
  }
  export interface TeamOut {
    team_id:    string
    team_name:  string
    main_roster: TeamMember[]
  }
  
  export interface MatchEventOut {
    formatted_news_id: string
    news_creation_time?: string
    timestamp?: string | number
    header?: string
    text: string
    respective_relevance?: number | null
  }
  