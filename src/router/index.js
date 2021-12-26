import Login from '../pages/login.vue';
import List from '../pages/list.vue';
import ModPwd from '../pages/mod-pwd.vue';
import VueRouter from 'vue-router';

const routes = [
    {path: '/', name: 'login', component: Login},
    {path: '/pwd', name: 'mod-pwd', component: ModPwd},
    {path: '/list', name: 'list', component: List}
];

const router = new VueRouter({
    routes
});
window.router = router;

export default router;