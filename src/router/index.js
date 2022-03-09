import VueRouter from 'vue-router'

import MyBacklog from '../pages/MyBacklog'
import DataStatistics from '../pages/DataStatistics'
import Setting from '../pages/Setting'
import About from '../pages/About'


// export vue-router
export default new VueRouter({
    routes: [
        {
            path: '/MyBacklog',
            component: MyBacklog
        },
        {
            path: '/DataStatistics',
            component: DataStatistics
        },
        {
            path: '/Setting',
            component: Setting
        },
        {
            path: '/About',
            component: About
        }
    ]
})


//捕获路由转发的错误
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}