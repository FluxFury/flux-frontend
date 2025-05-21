<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { computed } from "vue"
import { Moon, Search, Sunny } from "@element-plus/icons-vue"
import { initial_values } from "@/components/navbar/data.ts"
import logo from "@/assets/images/image 12.png"
import { useMainStore } from "@/stores/useMainStore"

const theme_switch = ref<boolean>(initial_values.theme_switch_initial_value)
const main = useMainStore()
// двусторонний биндинг на стор
const search_input_value = computed({
  get: () => main.searchTerm,
  set: v => main.searchTerm = v
})
const router = useRouter()

const handleLogoClick = () => {
	router.push({ path: "/" })
}
</script>

<template>
	<div class="switch-container">
		<el-switch
			class="color-theme-switch"
			v-model="theme_switch"
			:active-action-icon="Sunny"
			:inactive-action-icon="Moon"
		/>
	</div>

	<!--logo and search-->
	<div class="logo-and-search-container">
		<el-image class="logoImage" :src="logo" @click="handleLogoClick" />
		<el-input class="navbar-search-input" v-model="search_input_value" placeholder="Search" :prefix-icon="Search" />
	</div>
</template>

<style scoped lang="scss">
.switch-container {
	text-align: end;
	border-bottom: 3px solid var(--primary-color);
	margin-bottom: 2rem;
}

.color-theme-switch {
	margin-right: 1rem;
}

.logo-and-search-container {
	justify-content: space-between;
	display: flex;
	align-items: center;
}

.logoImage {
	width: 25vw;
	margin-left: 2rem;
	cursor: pointer;
}

.navbar-search-input {
	width: 50vw;
	height: fit-content;
	margin-right: 1.1rem;
	font-size: 20px;
	font-weight: lighter;
}
</style>
