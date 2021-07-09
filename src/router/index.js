import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)

const routes = [
    {
        path: "/",
        component: () => import("@/pages/Index")
    },
    {
        path: '/drag',
        component: () => import("@/pages/Drag")
    }
]

const router = new Router({
    mode: "hash",
    routes
})

export default router