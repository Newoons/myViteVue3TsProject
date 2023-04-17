import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus,{ Table } from "element-plus"
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./assets/css/common.scss"
import "./assets/css/index.scss"
import axios from "./request/request"

const app = createApp(App)

// 饿了么图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 解决el-table自适应问题
// const fixELtableErr = table => {
//     const oldResizeListener = table.methods.resizeListener
//     table.methods.resizeListener = function () {
//         window.requestAnimationFrame(oldResizeListener.bind(this))
//     }
// }
// fixELtableErr(Table)
app.config.globalProperties.$axios = axios;

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

