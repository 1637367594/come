/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './components/App'
import router from './router'

window.Vue = require('vue');
Vue.use(ElementUI);

const app = new Vue({
    el: '#main',
    router,
    store,
    components: {App},
    template: '<App/>'
});
