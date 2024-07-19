<script setup>
import Navbar from "@/components/navbar/navbar.vue"
</script>

<template>
	<el-container>
		<el-header class="header-container">
			<navbar/>
		</el-header>
		<el-main class="main-container">
			<router-view />
		</el-main>
	</el-container>
</template>

<style>
.header-container, .main-container {
	padding: 0;
	margin: 0;
	height: fit-content;
}

.header-container {
	margin-bottom: 2rem;
}
</style>
