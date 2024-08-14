import { createWebHistory, createRouter } from "vue-router"
import IndexView from "../views/index.vue"
import MatchView from "../views/match.vue"
import NotFound from "../views/not-found.vue"

const routes = [
	{ path: "/", component: IndexView },
	{ path: "/match/:id", component: MatchView, props: true },
	{ path: "/:catchAll(.*)", component: NotFound }
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
