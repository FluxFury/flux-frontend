<script setup lang="ts">
import type { TeamOut } from '@/types/api'
const props = defineProps<{ teams: TeamOut[] }>()

// teams: [{ team_id, team_name, main_roster: TeamMember[] }, …]
</script>

<template>
  <div class="teams-container">
    <div v-for="team in props.teams" :key="team.team_id" class="team-roster-container">
      <h3>{{ team.team_name }}</h3>
      <el-table :data="team.main_roster" style="width:100%">
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="nickname" label="Nickname" />
        <el-table-column prop="age" label="Age" />
        <!-- если у вас есть country и status -->
        <el-table-column prop="country" label="Country" />
        <el-table-column prop="status" label="Status" />
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.teams-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.team-roster-container {
  /* две колонки по ~45% внутреннего контейнера */
  flex: 0 0 45%;
  min-width: 300px;
}

/* именно этот блок станет прокручиваемым */
.table-wrapper {
  overflow-x: auto;
}

/* благодаря deep селектору заставляем «настоящую» <table> внутри el-table иметь минимальную ширину */
.table-wrapper ::v-deep .el-table__header-wrapper table,
.table-wrapper ::v-deep .el-table__body-wrapper table {
  min-width: 600px; /* подбери под свою реальную ширину колонок */
}
</style>