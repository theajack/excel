import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './pages/styles/global.less';
import mixin from './lib/vue/mixin';
import {initDirective} from './lib/vue/directive';

Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.mixin(mixin);

initDirective();

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
