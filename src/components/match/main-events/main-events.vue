<script setup lang="ts">
import { ref, watch, defineComponent, h, Ref } from "vue"
import { ElCheckbox, ElCheckboxGroup, type CheckboxValueType, type CheckboxGroupValueType } from "element-plus"
import { useEventsStore } from "@/stores/useEventStore"
import { getFormattedDate } from "@/Utils/getFormattedDate"
import type { MatchEventOut } from "@/types/api"

/* ---------- входные данные от бэка ---------- */
interface Facet { keyword: string; count: number }
interface Facets {
  available_dates: { date: string; count: number }[]
  people: Facet[]
  orgs: Facet[]
  events: Facet[]
  locations: Facet[]
  other: Facet[]
}
const props = defineProps<{ events: MatchEventOut[]; facets: Facets }>()

/* ---------- Pinia ---------- */
const es = useEventsStore()
es.setEvents(props.events)

/* ---------- сортировка ---------- */
const sortOptions = [
  { value: "date_desc", label: "Date ↓" },
  { value: "date_asc",  label: "Date ↑" },
  { value: "relevance", label: "Relevance" }
]
const sortValue = ref(es.sortType)
watch(sortValue, v => es.setSortType(v))

/* ====================================================== */
/*               CHECK‑ALL COMPOSABLE (no generics)       */
/* ====================================================== */
export type CBVal = string | number
interface CheckState {
  full: CBVal[]
  checked: Ref<CBVal[]>
  checkAll: Ref<boolean>
  indeterminate: Ref<boolean>
  syncFromGroup: (vals: CheckboxGroupValueType) => void
  toggleAll: (val: CheckboxValueType) => void
}

function makeCheckState(full: CBVal[]): CheckState {
  const checked = ref<CBVal[]>([...full])
  const checkAll = ref(true)
  const indeterminate = ref(false)

  const syncFromGroup = (vals: CheckboxGroupValueType) => {
    const arr = vals as CBVal[]
    checked.value       = arr
    checkAll.value      = arr.length === full.length
    indeterminate.value = arr.length > 0 && arr.length < full.length
  }

  const toggleAll = (val: CheckboxValueType) => {
    const bool = !!val
    checkAll.value      = bool
    indeterminate.value = false
    checked.value       = bool ? [...full] : []
  }

  return { full, checked, checkAll, indeterminate, syncFromGroup, toggleAll }
}

/* ---------- states ---------- */
const dateState   = makeCheckState(es.timestamps as unknown as CBVal[])
const personState = makeCheckState(props.facets.people.map(p => p.keyword))
const eventState  = makeCheckState(props.facets.events.map(e => e.keyword))
const orgState    = makeCheckState(props.facets.orgs.map(o => o.keyword))

/* ---------- watchers ---------- */
watch(() => dateState.checked.value  , v => es.setTimestampsFilter(v as number[]), { immediate: true })
watch(() => personState.checked.value, v => es.setPersonsFilter(v as string[] ) , { immediate: true })
watch(() => eventState.checked.value , v => es.setEventsFilter(v  as string[] ) , { immediate: true })
watch(() => orgState.checked.value   , v => es.setOrgsFilter(v    as string[] ) , { immediate: true })

/* ====================================================== */
/*                FILTER BLOCK (render fn)                */
/* ====================================================== */
const FilterBlock = defineComponent({
  name: "FilterBlock",
  props: {
    title : { type: String, required: true },
    state : { type: Object as () => CheckState, required: true },
    format: { type: Function, default: (v: CBVal) => String(v) }
  },
  setup(p) {
    return () => h("section", { class: "filter-block" }, [
      h("h3", { class: "filter-header" }, p.title),

      h(
        ElCheckbox,
        {
          modelValue: p.state.checkAll.value,
          indeterminate: p.state.indeterminate.value,
          "onUpdate:modelValue": p.state.toggleAll
        },
        { default: () => "All" }
      ),

      h(
        ElCheckboxGroup,
        {
          modelValue: p.state.checked.value,
          "onUpdate:modelValue": p.state.syncFromGroup,
          class: "filter-group"
        },
        () => p.state.full.map(opt =>
          h(
            ElCheckbox,
            { value: opt },
            { default: () => p.format(opt) }
          )
        )
      )
    ])
  }
})
</script>

<template>
  <div class="main-events">
    <div class="header">
      <h1>Main events</h1>
      <el-select v-model="sortValue" style="width:240px">
        <el-option v-for="o in sortOptions" :key="o.value" :label="o.label" :value="o.value" />
      </el-select>
    </div>

    <el-container>
      <el-main class="timeline-col">
        <template v-if="es.filtered_events.length">
          <el-timeline>
            <el-timeline-item
              v-for="ev in es.filtered_events"
              :key="ev.id"
              :timestamp="getFormattedDate((ev.news_creation_time ?? ev.timestamp) as string | number)"
            >
              <h3>{{ ev.header || ev.title || ev.text.slice(0,120) }}</h3>
              <p class="rel">Relevance: {{ ev.respective_relevance ?? "—" }}</p>
              <p>{{ ev.text }}</p>
            </el-timeline-item>
          </el-timeline>
        </template>
        <el-empty v-else description="No events found" />
      </el-main>

      <el-aside class="filters">
        <FilterBlock title="Date"         :state="dateState"   :format="(t:CBVal)=>getFormattedDate(t as number)" />
        <FilterBlock title="Person"       :state="personState" />
        <FilterBlock title="Event"        :state="eventState" />
        <FilterBlock title="Organization" :state="orgState" />
      </el-aside>
    </el-container>
  </div>
</template>

<style scoped>
.main-events   { margin:1rem 3rem 0; }
.header        { display:flex; align-items:center; gap:1rem; }
.timeline-col  { padding:0; }
.rel           { font-size:.85rem; opacity:.7; margin:.25rem 0 .5rem; }
.filters       { border-left:1px solid var(--el-border-color); padding-left:1rem; }
.filter-block  { margin-bottom:1rem; }
.filter-header { margin:0 0 .25rem 0; font-weight:normal; }
.filter-group  { display:flex; flex-direction:column; margin-top:.5rem; }
</style>
