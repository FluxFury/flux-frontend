<script setup lang="ts">
import { ref, watch, computed } from "vue"
import { useRouter } from "vue-router"
import { apiMain } from "@/api/mainPage"
import type { MatchOut } from "@/types/api"
import { getTagType } from "@/Utils/getTagType"
import { getFormattedDate } from "@/Utils/getFormattedDate"
import { useMainStore } from "@/stores/useMainStore"
import { capitalize } from "@/Utils/capitalize"

const router = useRouter()
const main = useMainStore()

// Параметры и состояния
const page = ref(1)
const pageSize = ref(10)
const pageFinished = ref(1)
const pageSizeFinished = ref(10)
const sportId = computed(() => main.sport_id)
const compId = computed(() => main.competition_id)

// Данные матчей
const allActiveMatches = ref<MatchOut[]>([])
const allFinishedMatches = ref<MatchOut[]>([])

async function fetchAllMatches(params: Record<string, unknown>, status: string) {
  let currentPage = 1
  const pageSize = 1000
  let all: MatchOut[] = []
  let hasMore = true
  while (hasMore) {
    const res = await apiMain.matches({ ...params, status, page: currentPage, page_size: pageSize })
    const rows = res.data.data
    all = all.concat(rows)
    hasMore = rows.length === pageSize
    currentPage++
  }
  return all
}

watch([sportId, compId], loadAll, { immediate: true })

async function loadAll() {
  // Активные
  const paramsActive = {
    sport_id: sportId.value,
    competition_id: compId.value,
  }
  allActiveMatches.value = await fetchAllMatches(paramsActive, "Live,Scheduled,Cancelled")
  // Завершённые
  const paramsFinished = { sport_id: sportId.value }
  allFinishedMatches.value = await fetchAllMatches(paramsFinished, "Finished")
  page.value = 1
  pageFinished.value = 1
}

// Фильтры и поиск
const activeStatusFilter = ref<string[]>([])
const finishedStatusFilter = ref<string[]>([])
const searchTerm = computed(() => main.searchTerm.trim().toLowerCase())

// Сортировка
const sortActive = ref<{ prop: string; order: "ascending" | "descending" | null }>({
  prop: "planned_start_datetime",
  order: null,
})
const sortFinished = ref<{ prop: string; order: "ascending" | "descending" | null }>({
  prop: "planned_start_datetime",
  order: null,
})

// Основная функция обработки данных: фильтрация → поиск → сортировка
function processRows(rows: MatchOut[], statusFilter: string[], sort: { prop: string; order: "ascending" | "descending" | null }) {
  let filtered = rows

  // 1. Поиск
  if (searchTerm.value) {
    filtered = filtered.filter(r =>
      ((r.pretty_match_name || r.match_name || '')).toLowerCase().includes(searchTerm.value)
    )
  }

  // 2. Фильтр по статусу
  if (statusFilter.length) {
    filtered = filtered.filter(row =>
      statusFilter.includes(capitalize(row.status_name))
    )
  }

  // 3. Сортировка
  if (sort.order) {
    const asc = sort.order === "ascending"
    filtered = filtered.slice().sort((a, b) => {
      const at = Date.parse(a.planned_start_datetime)
      const bt = Date.parse(b.planned_start_datetime)
      return asc ? at - bt : bt - at
    })
  }

  return filtered
}

// Computed для таблиц
const processedActiveRows = computed(() =>
  processRows(allActiveMatches.value, activeStatusFilter.value, sortActive.value)
)
const processedFinishedRows = computed(() =>
  processRows(allFinishedMatches.value, finishedStatusFilter.value, sortFinished.value)
)

// Пагинация
const displayedActiveRows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return processedActiveRows.value.slice(start, start + pageSize.value)
})
const displayedFinishedRows = computed(() => {
  const start = (pageFinished.value - 1) * pageSizeFinished.value
  return processedFinishedRows.value.slice(start, start + pageSizeFinished.value)
})

const paginationTotalActive = computed(() => processedActiveRows.value.length)
const paginationTotalFinished = computed(() => processedFinishedRows.value.length)

// Обработчики сортировки
function onActiveSortChange({ prop, order }: { prop: string; order: "ascending" | "descending" | null }) {
  if (prop === "planned_start_datetime") sortActive.value = { prop, order }
}
function onFinishedSortChange({ prop, order }: { prop: string; order: "ascending" | "descending" | null }) {
  if (prop === "planned_start_datetime") sortFinished.value = { prop, order }
}

// Пагинация
const handleSizeChange = (size: number) => { pageSize.value = size; page.value = 1 }
const handleCurrentChange = (p: number) => { page.value = p }
const handleRowClick = (row: any) => router.push({ path: `/match/${row.match_id}` })
const handleFinishedSizeChange = (size: number) => { pageSizeFinished.value = size; pageFinished.value = 1 }
const handleFinishedCurrentChange = (p: number) => { pageFinished.value = p }

// Сбросить пагинацию при поиске или смене фильтра
watch([activeStatusFilter, searchTerm], () => { page.value = 1 })
watch([finishedStatusFilter, searchTerm], () => { pageFinished.value = 1 })

// Сбросить, если после фильтрации оказались на пустой странице
watch(() => processedActiveRows.value.length, (newLength) => {
  if ((page.value - 1) * pageSize.value >= newLength && page.value > 1) page.value = 1
})
watch(() => processedFinishedRows.value.length, (newLength) => {
  if ((pageFinished.value - 1) * pageSizeFinished.value >= newLength && pageFinished.value > 1) pageFinished.value = 1
})

// Функции для смены фильтра по статусу
function onActiveStatusFilterChange(val: string[]) {
  activeStatusFilter.value = val
  page.value = 1
}
function onFinishedStatusFilterChange(val: string[]) {
  finishedStatusFilter.value = val
  pageFinished.value = 1
}

// Варианты фильтров по статусу (можно вынести в constants)
const activeStatusOptions = [
  { text: 'Live', value: 'Live' },
  { text: 'Scheduled', value: 'Scheduled' },
  { text: 'Cancelled', value: 'Cancelled' }
]
const finishedStatusOptions = [
  { text: 'Finished', value: 'Finished' }
]
</script>

<template>
  <div class="table-and-pagination-links-container" v-loading="!allActiveMatches.length && !allFinishedMatches.length">

    <!-- ФИЛЬТРЫ ДЛЯ АКТУАЛЬНЫХ МАТЧЕЙ -->
    <el-select v-model="activeStatusFilter" multiple clearable placeholder="Filter by status" style="width: 240px; margin-bottom: 12px;">
      <el-option v-for="item in activeStatusOptions" :key="item.value" :label="item.text" :value="item.value" />
    </el-select>

    <!-- ПАГИНАЦИЯ (актуальные) -->
    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="[10, 50, 100, 200, 300]"
      layout="sizes, prev, pager, next, jumper"
      :total="paginationTotalActive"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="table-pagination"
    />

    <!-- АКТУАЛЬНЫЕ МАТЧИ -->
    <h3>Current / Live / Scheduled</h3>
    <el-table :data="displayedActiveRows" border class="matches-table clickable" @row-click="handleRowClick"
      @sort-change="onActiveSortChange" :row-style="{ cursor: 'pointer' }">
      <el-table-column>
        <template #header>Match</template>
        <template #default="{ row }">{{ row.pretty_match_name || row.match_name }}</template>
      </el-table-column>
      <el-table-column prop="status_name" label="Status">
        <template #default="{ row }">
          <el-tag :type="getTagType(row.status_name)">
            {{ capitalize(row.status_name) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="competition_name" label="Competition">
        <template #default="{ row }">{{ row.competition_name || "-" }}</template>
      </el-table-column>
      <el-table-column prop="news_count" label="News count">
        <template #default="{ row }">{{ row.news_count || 0 }}</template>
      </el-table-column>
      <el-table-column prop="planned_start_datetime" label="Date" sortable>
        <template #default="{ row }">{{ getFormattedDate(Date.parse(row.planned_start_datetime)) }}</template>
      </el-table-column>
    </el-table>

    <el-divider class="tables-divider" />

    <!-- ФИЛЬТРЫ ДЛЯ FINISHED -->
    <el-select v-model="finishedStatusFilter" multiple clearable placeholder="Filter by status" style="width: 220px; margin-bottom: 12px;">
      <el-option v-for="item in finishedStatusOptions" :key="item.value" :label="item.text" :value="item.value" />
    </el-select>

    <!-- FINISHED МАТЧИ -->
    <h3>Finished</h3>
    <el-table :data="displayedFinishedRows" border class="matches-table finished" @sort-change="onFinishedSortChange">
      <el-table-column>
        <template #header>Match</template>
        <template #default="{ row }">{{ row.pretty_match_name || row.match_name }}</template>
      </el-table-column>
      <el-table-column prop="status_name" label="Status">
        <template #default="{ row }">
          <el-tag :type="getTagType(row.status_name)">
            {{ capitalize(row.status_name) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="competition_name" label="Competition">
        <template #default="{ row }">{{ row.competition_name || "-" }}</template>
      </el-table-column>
      <el-table-column prop="planned_start_datetime" label="Date" sortable>
        <template #default="{ row }">{{ getFormattedDate(Date.parse(row.planned_start_datetime)) }}</template>
      </el-table-column>
    </el-table>

    <!-- ПАГИНАЦИЯ ДЛЯ FINISHED -->
    <el-pagination
      :current-page="pageFinished"
      :page-size="pageSizeFinished"
      :page-sizes="[10, 50, 100, 200, 300]"
      layout="sizes, prev, pager, next, jumper"
      :total="paginationTotalFinished"
      @size-change="handleFinishedSizeChange"
      @current-change="handleFinishedCurrentChange"
      class="table-pagination"
    />
  </div>
</template>

<style scoped lang="scss">
.table-and-pagination-links-container {
  margin: 2rem 3rem 0 3rem;
}
.table-pagination {
  width: fit-content;
  margin: auto
}
.matches-table {
  margin: 0.5rem 0
}
</style>
