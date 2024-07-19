<script setup>
import { Moon, Search, Sunny } from "@element-plus/icons-vue"
import { ref } from "vue"

import { initial_values } from "@/components/navbar/data.js"
import logo from "@/assets/images/image 12.png"


const theme_switch = ref(initial_values.theme_switch_initial_value)
const search_input_value = ref(initial_values.search_input_initial_value)
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
		<el-image	class="logoImage" :src="logo"/>
		<el-input
			class="navbar-search-input"
			v-model="search_input_value"
			placeholder="Search"
			:prefix-icon="Search"
		/>
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
}

.navbar-search-input {
	width: 50vw;
	height: fit-content;
	margin-right: 1.1rem;
	font-size: 20px;
	font-weight: lighter;
}
</style>
