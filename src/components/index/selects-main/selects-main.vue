<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useMainStore }    from '@/stores/useMainStore'

const main = useMainStore()

/* первый запуск */
onMounted(() => main.bootstrap())

/* ===== реакция на выбор спорта ===== */
watch(() => main.sport_id, async () => {
  main.page = 1
  main.competition_id = undefined   // сбрасываем предыдущий турнир
  await main.loadCompetitions()     // подтягиваем турниры
})

/* ===== реакция на выбор турнира ===== */
watch(() => main.competition_id, () => {
  main.page = 1
  main.loadMatches()
})
</script>

<template>
  <div class="selects-container">
    <!-- Селект спорта -->
    <el-select
      v-model="main.sport_id"
      placeholder="Select sport"
      clearable
      style="width: 240px"
    >
      <el-option
        v-for="s in main.sports"
        :key="s.sport_id"
        :label="s.name"
        :value="s.sport_id"
      />
    </el-select>

    <!-- Селект турнира -->
    <el-select
      v-model="main.competition_id"
      placeholder="Select competition"
      clearable
      :disabled="!main.competitions.length"
      style="width: 240px"
    >
      <el-option
        v-for="c in main.competitions"
        :key="c.competition_id"
        :label="c.name"
        :value="c.competition_id"
      />
    </el-select>
  </div>
</template>

<style scoped>
.selects-container{
  display:flex; justify-content:space-between;
  align-items:center; margin:0 3rem;
}
</style>
