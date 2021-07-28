/*
 * @Description: 
 * @Date: 2021-06-04 09:42:10
 * @page: 
 */
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
    },
    {
        path: '/dragcopy',
        component: () => import("@/pages/DragCopy")
    },
    {
        path: '/map',
        component: () => import("@/pages/Map")
    },
    {
        path: '/population',
        component: () => import("@/pages/Population")
    },
    {
        path: '/echarts',
        component: () => import("@/pages/Echarts")
    },
    {
        path: '/avue',
        component: () => import("@/pages/Avue")
    },
    {
        path: '/demo',
        component: () => import("@/pages/Demo")
    }
]

const router = new Router({
    mode: "hash",
    routes
})

export default router