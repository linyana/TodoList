import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import VueRouter from 'vue-router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(VueRouter).use(ElementUI)


new Vue({
    el: '#root',
    render: h=>h(App),
    store,
    router: router
})
