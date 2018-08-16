import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const Home= () => import('src/components/home/home.js');

const routes = [
    {
        path: '/',redirect:"/home", component: Home,
    },
    {
        path: '/home', component: Home,
    }


]
const router = new VueRouter({
    routes
})

export default router;