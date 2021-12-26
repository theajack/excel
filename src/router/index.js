// import Login from '../pages/login.vue';
import List from '../pages/list.vue';
import VueRouter from 'vue-router';

const routes = [
    {path: '/', name: 'list', component: List},
    // {path: '/login', name: 'login', component: Login},
];

const router = new VueRouter({
    routes
});

export default router;