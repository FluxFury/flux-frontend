<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute }          from 'vue-router'
import { useMatchStore }     from '@/stores/useMatchStore'

import MatchHeader  from '@/components/match/match-header/match-header.vue'
import Teams        from '@/components/match/teams/teams.vue'
import MainEvents   from '@/components/match/main-events/main-events.vue'

const route = useRoute()
const matchStore = useMatchStore()

// при переходе на эту страницу — инициализируем стор
onMounted(() => {
  const matchId = route.params.id as string
  matchStore.init(matchId)
})

// Если вдруг id в url поменяется (редирект/замена)
watch(() => route.params.id, id => {
  if (typeof id === 'string') matchStore.init(id)
})
</script>

<template>
  <div class="match-page">
    <!-- Хедер: название, дата, статус -->
    <MatchHeader
      v-if="matchStore.details"
      :match_title="matchStore.details.pretty_match_name"
      :match_timestamp="new Date(matchStore.details.planned_start_datetime).getTime()"
      :match_status="matchStore.details.status_name"
      :competition_name="matchStore.details.competition_name"
      :competition_logo_url="matchStore.details.competition_logo_url"
    />

    <!-- Составы команд -->
    <Teams
      v-if="matchStore.teams.length"
      :teams="matchStore.teams"
    />

    <!-- Основные события -->
    <MainEvents
      v-if="matchStore.events?.data?.length"
      :events="matchStore.events.data"
      :facets="matchStore.events.facets"
    />
  </div>
</template>

<style scoped>
.match-page {

  margin: 2rem auto;
  padding: 0 1rem; /* можно чуть отступов добавить */
}

</style>
