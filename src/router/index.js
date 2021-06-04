import Router from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("@/pages/Index")
    }
]

const router = new Router({
    mode: "hash",
    routes
})

export default router